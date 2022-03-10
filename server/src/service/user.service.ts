import { ApolloError } from "apollo-server-core";
import { CreateUserInput, LoginInput, User, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";


class UserService{
    async createUser(input: CreateUserInput){
        return UserModel.create(input);
    }

    async getUserByEmail(email: User["email"]){
        return UserModel.findOne({email});
    }

    async login(input: LoginInput, context: Context){
        const error = "Invalid email or password";
        const user = await this.getUserByEmail(input.email);
        if(!user) throw new ApolloError(error);

        // compare the password given for the login and the password stored in db against the user
        const validatePassword = await bcrypt.compare(input.password, user.password);

        if(!validatePassword) throw new ApolloError(error);


        const token = signJwt(user.toJSON());

        context.res.cookie("accessToken", token, {
            maxAge: 7e10,
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: false
        });

        return token;


    }
}

export default UserService;