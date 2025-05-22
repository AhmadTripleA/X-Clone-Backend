import { NewPost } from "../../connections/db-schema";
import { ValidRequest } from "../../types/common";
import { CreatePostReqBody } from "./types";

export class PostProcessors {
    
    public processPostCreation(request: ValidRequest<CreatePostReqBody>): NewPost {
        const { content, hashtags } = request.body;

        return {
            content: {
                text: content.text ?? '',
                image_uris: content.image_uris ?? [],
            },
            hashtags: hashtags.join(','),
            user_id: request.user_id,
            comment_count: 0,
            is_repost: false,
            like_count: 0,
            retweet_count: 0,
            status: 100,
            visibility: 1
        };
    }
}
