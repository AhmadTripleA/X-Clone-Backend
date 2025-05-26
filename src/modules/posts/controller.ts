import { Response } from 'express';
import { BaseAPI, CustomReq } from '../../classes/BaseApi';
import { ValidRequest } from '../../types/common';
import { PostServices } from '../../services/post-services';
import { PostProcessors } from './processors';
import { CreatePostReqBody } from './types';
import { validateData } from '../../helpers/common';
import { createPostBodyVal } from './validators';

export class PostsAPI extends BaseAPI {
    constructor() {
        super();
        this.initRoutes();
    }
    protected requests: CustomReq[] = [
        { method: 'get', route: '/:id', handler: getPostById },
        { method: 'post', route: '/', handler: createPost },
    ];
}

const service = new PostServices();
const processor = new PostProcessors();

const createPost = async (req: ValidRequest<CreatePostReqBody>, res: Response) => {
    validateData(req.body, createPostBodyVal);

    const data = processor.processPostCreation(req);
    
    const post = service.createNewPost(data);
    
    res.status(200).send({ Post: post });
};

const getPostById = async (req: ValidRequest, res: Response) => {
    const post_id = Number(req.params.id);
    
    const post = await service.getById(post_id);
    
    res.status(200).send({ Post: post });
};
