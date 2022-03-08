import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateFeedDetailInput, FeedDetail } from "../schema/feed-detail.schema";
import FeedDetailService from "../service/feed-detail.service";


@Resolver()
export default class FeedDetailResolver{

    constructor(private feedDetailService: FeedDetailService){
        this.feedDetailService = new FeedDetailService();
    }

    @Query(() => [FeedDetail])
    getAllFeedDetails(){
        return this.feedDetailService.getAllFeedDetails();
    }

    @Mutation(() => FeedDetail)
    createFeedDetail(@Arg("input") input:CreateFeedDetailInput){
        return this.feedDetailService.createFeedDetail(input);
    }

    @Mutation(() => FeedDetail)
    deleteFeedDetail(@Arg("input") input: string){
        return this.feedDetailService.deleteFeedDetail(input);
    }
}