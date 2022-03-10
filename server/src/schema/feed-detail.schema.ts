import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class FeedDetail{

    @Field(() => String)
    readonly _id: string


    @Field(() => String)
    @prop({
        required: true
    })
    feedTitle: string


    @Field(() => String)
    @prop({
        required: true
    })
    feedAuthor: string


    @Field(() => String)
    @prop({
        required: true
    })
    feedDate: string


    @Field(() => String)
    @prop({
        required: true
    })
    feedDescription: string


    @Field(() => String)
    @prop({
        required: true
    })
    feedUrl: string

}

export const FeedDetailModel = getModelForClass(FeedDetail);

@InputType()
export class CreateFeedDetailInput{

    @Field(() => String)
    feedTitle: string

    @Field(() => String)
    feedAuthor: string

    @Field(() => String)
    feedDate: string

    @Field(() => String)
    feedDescription: string

    @Field(() => String)
    feedUrl: string
}
