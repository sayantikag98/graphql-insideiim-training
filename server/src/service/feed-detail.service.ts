import { CreateFeedDetailInput, FeedDetailModel, FeedDetail } from "../schema/feed-detail.schema";

class FeedDetailService{
    async createFeedDetail(input: CreateFeedDetailInput){
        return FeedDetailModel.create(input);
    }

    async deleteFeedDetail(id: FeedDetail["_id"]){
        return FeedDetailModel.findByIdAndDelete(id);
    }

    async getAllFeedDetails(){
        return FeedDetailModel.find({});
    }

}

export default FeedDetailService;