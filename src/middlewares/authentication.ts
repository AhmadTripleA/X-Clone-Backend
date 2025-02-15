import { NextFunction, Request, Response } from "express";
import { ValidRequest } from "../types/common";

export class AuthenticationMW {

    public validToken = async (req: Request, res: Response, next: NextFunction) => {
        const validReq = req as ValidRequest;
        if ((validReq.headers.access_token ?? "") == "dev") {
            validReq.user_id = 2000;
            next();
        }

        else throw new Error("Bad Authentication.");
    }
}