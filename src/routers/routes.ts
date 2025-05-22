import { RequestHandler } from 'express';
import { AuthenticationMW } from '../middlewares/authentication';
import { BaseAPI } from '../classes/BaseApi';
import { UsersAPI } from '../modules/users/controller';
import { PostsAPI } from '../modules/posts/controller';
import { AuthAPI } from '../modules/auth/controller';

const authMW = new AuthenticationMW();
const validToken = authMW.validToken;

export const routes: {
    path: string;
    api: BaseAPI;
    middlewares: RequestHandler[];
}[] = [
    { path: '/users', api: new UsersAPI(), middlewares: [validToken] },
    { path: '/posts', api: new PostsAPI(), middlewares: [validToken] },
    { path: '/auth', api: new AuthAPI(), middlewares: [] },
];
