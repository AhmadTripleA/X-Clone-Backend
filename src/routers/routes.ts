import { UsersAPI } from "../modules/users";
import { AuthenticationMW } from "../middlewares/authentication";
import { BaseAPI } from "../classes/BaseApi";
import { RequestHandler } from "express";

const authMW = new AuthenticationMW();
const validToken = authMW.validToken;

export const routes: { 
    path: string,
    api: BaseAPI
    middlewares?: RequestHandler[],
}[] = [
    { path: "/users", api: new UsersAPI(), middlewares: [] },
]