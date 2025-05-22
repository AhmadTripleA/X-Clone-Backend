import { Request } from "express";

export interface ValidRequest<Body = any> extends Request {
    user_id: number;
    body: Body;
}