import { CreateFeedUrlInput, FeedUrlModel, FeedUrl, IdInput } from "../schema/feed-url.schema";
import { User } from "../schema/user.schema";

class FeedUrlService{
    async createFeedUrl(input: CreateFeedUrlInput & {user: User['_id']}){
        // Call the user model to create a new user
        return FeedUrlModel.create(input);
    }

    async deleteFeedUrl(id: IdInput & {user: User['_id']}){
        return FeedUrlModel.findByIdAndDelete(id);
    }

    async updateFeedUrl(id: IdInput & {user: User['_id']}, feedUrl: CreateFeedUrlInput){
        return FeedUrlModel.findByIdAndUpdate(id, feedUrl, { new: true})
    }

    async getAllFeedUrls(){
        return FeedUrlModel.find({});
    }

    async getFeedUrlById(id: IdInput){
        return FeedUrlModel.findById(id);
    }
}

export default FeedUrlService;