import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import FeedUrlResolver from "./resolvers/feed-url.resolver";
import mongoose from "mongoose";
import FeedDetailResolver from "./resolvers/feed-detail.resolver";
import { ApolloServer } from 'apollo-server-express';
import cookieParser from "cookie-parser";
import UserResolver from "./resolvers/user.resolver";
import { verifyJwt } from "./utils/jwt";
import Context from "./types/context";
import { User } from "./schema/user.schema";
import authChecker from "./utils/authChecker"


dotenv.config();
const PORT = 4000;

async function bootstrap(){

    // Build the schema

    const schema = await buildSchema({
        resolvers: [FeedUrlResolver, FeedDetailResolver, UserResolver],
        authChecker
    });

    // make an express app

    const app = express();

    app.use(cookieParser());

    // create apollo server

    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            const context = ctx;
            const accessToken = ctx.req.cookies.accessToken;
            if(accessToken){
                const user = verifyJwt<User>(accessToken);
                context.user = user;
            }
            return context;
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    })

    await server.start();

    // apply middleware to server

    server.applyMiddleware({app});

    // app.listen on express server
    app.listen(PORT, () => {
        console.log(`Server started at localhost port ${PORT}`);
    })

    // connect to db

    async function connectToMongo(){
        try{
            if(process.env.DBURI){
                await mongoose.connect(process.env.DBURI);
                console.log("Connected to DB");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    connectToMongo();


}

bootstrap();