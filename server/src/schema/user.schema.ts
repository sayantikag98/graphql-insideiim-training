import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";


@pre<User>("save", async function(){
    if(!this.isModified("password")){
        return
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    
})


@ObjectType()
export class User{

    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    email: string

    @prop({required: true})
    password: string
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput{

    @IsEmail()
    @Field(() => String)
    email: string



    @MinLength(5)
    @MaxLength(10)
    @Field(() => String)
    password: string

}

@InputType()
export class LoginInput{
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}

