import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, CreateUserInput, LoginInput } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver{

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    @Query(() => User, {nullable: true})
    me(@Ctx() context: Context){
        return context.user;
    }

    @Mutation(() => User)
    createUser(@Arg("input") input: CreateUserInput){
        return this.userService.createUser(input);
    }

    @Mutation(() => String) // returns the JWT
    // Context for setting up cookies
    login(@Arg("input") input: LoginInput, @Ctx() context: Context){
        return this.userService.login(input, context);
    }

}