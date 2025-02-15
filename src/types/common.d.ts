import { Request, Router } from "express";

export interface ValidRequest extends Request {
    user_id: number
}