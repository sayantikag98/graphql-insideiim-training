import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateFeedUrlInput, FeedUrl, IdInput } from "../schema/feed-url.schema";
import FeedUrlService from "../service/feed-url.service";
import Context from "../types/context";


@Resolver()
export default class FeedUrlResolver{

    private feedUrlService: FeedUrlService;

    constructor(){
        this.feedUrlService = new FeedUrlService();
    }

    @Query(() => [FeedUrl])
    getAllFeedUrls(){
        return this.feedUrlService.getAllFeedUrls();
    }

    @Query(() => FeedUrl)
    getFeedUrlById(@Arg("input") input: IdInput){
        return this.feedUrlService.getFeedUrlById(input);
    }

    @Authorized()
    @Mutation(() => FeedUrl)
    createFeedUrl(@Arg("input") input:CreateFeedUrlInput, @Ctx() context: Context){
        const user = context.user!;
        return this.feedUrlService.createFeedUrl({...input, user: user?._id});
    }

    @Mutation(() => FeedUrl)
    deleteFeedUrl(@Arg("input") input: IdInput, @Ctx() context: Context){
        const user = context.user!;
        return this.feedUrlService.deleteFeedUrl({...input, user: user?._id});
    }

    @Mutation(() => FeedUrl)
    updateFeedUrl(@Arg("input") input: IdInput, @Arg("feedUrl") feedUrl: CreateFeedUrlInput, @Ctx() context: Context ){
        const user = context.user!;
        return this.feedUrlService.updateFeedUrl({...input, user: user?._id}, feedUrl);
    }
}