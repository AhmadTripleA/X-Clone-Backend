interface ContentJSON {
    text: string;
    image_uris?: string[];
}

export interface CreatePostReqBody {
    content: Record<string, any>;
    hashtags: string[];
}