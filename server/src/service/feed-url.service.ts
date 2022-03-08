import { CreateFeedUrlInput, FeedUrlModel, FeedUrl } from "../schema/feed-url.schema";

class FeedUrlService{
    async createFeedUrl(input: CreateFeedUrlInput){
        // Call the user model to create a new user
        return FeedUrlModel.create(input);
    }

    async deleteFeedUrl(id: FeedUrl["_id"]){
        return FeedUrlModel.findByIdAndDelete(id);
    }

    async updateFeedUrl(id: FeedUrl["_id"], feedUrl: CreateFeedUrlInput){
        return FeedUrlModel.findByIdAndUpdate(id, feedUrl, { new: true})
    }

    async getAllFeedUrls(){
        return FeedUrlModel.find({});
    }

    async getFeedUrlById(id: FeedUrl["_id"]){
        return FeedUrlModel.findById(id);
    }
}

export default FeedUrlService;