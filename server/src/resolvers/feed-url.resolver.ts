import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateFeedUrlInput, FeedUrl } from "../schema/feed-url.schema";
import FeedUrlService from "../service/feed-url.service";


@Resolver()
export default class FeedUrlResolver{

    constructor(private feedUrlService: FeedUrlService){
        this.feedUrlService = new FeedUrlService();
    }

    @Query(() => [FeedUrl])
    getAllFeedUrls(){
        return this.feedUrlService.getAllFeedUrls();
    }

    @Query(() => FeedUrl)
    getFeedUrlById(@Arg("input") input: string){
        return this.feedUrlService.getFeedUrlById(input);
    }

    @Mutation(() => FeedUrl)
    createFeedUrl(@Arg("input") input:CreateFeedUrlInput){
        return this.feedUrlService.createFeedUrl(input);
    }

    @Mutation(() => FeedUrl)
    deleteFeedUrl(@Arg("input") input: string){
        return this.feedUrlService.deleteFeedUrl(input);
    }

    @Mutation(() => FeedUrl)
    updateFeedUrl(@Arg("input") input: string, @Arg("feedUrl") feedUrl: CreateFeedUrlInput ){
        return this.feedUrlService.updateFeedUrl(input, feedUrl);
    }
}