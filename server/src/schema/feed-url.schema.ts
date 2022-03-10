import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { IsUrl } from "class-validator";
import { Field, InputType, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";


@ObjectType()
export class FeedUrl{

    @Field(() => String)
    readonly _id: string

    @Field(() => String)
    @prop({
        required: true,
        ref: () => User
    })
    user: Ref<User>


    @Field(() => String)
    @prop({required: true})
    feedUrl: string

}

export const FeedUrlModel = getModelForClass(FeedUrl);

@InputType()
export class CreateFeedUrlInput{

    @IsUrl()
    @Field()
    feedUrl: string
}


@InputType()
export class IdInput{
    @Field()
    _id: string
}
