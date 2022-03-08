import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import FeedUrlResolver from "./resolvers/feed-url.resolver";
import mongoose from "mongoose";
import FeedDetailResolver from "./resolvers/feed-detail.resolver";

dotenv.config();
const PORT = 4000;

async function bootstrap(){

    // Build the schema

    const schema = await buildSchema({
        resolvers: [FeedUrlResolver, FeedDetailResolver]
    });

    // make an express app

    const app = express();

    // create apollo server

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
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