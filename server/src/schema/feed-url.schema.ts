import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class FeedUrl{

    // id
    @Field(() => String)
    _id: string


    // name
    @Field(() => String)
    @prop({
        required: true
    })
    feedUrl: string

}

export const FeedUrlModel = getModelForClass(FeedUrl);

@InputType()
export class CreateFeedUrlInput{

    @Field(() => String)
    feedUrl: string
}
