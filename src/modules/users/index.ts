import { Response, Request } from "express";
import { BaseAPI } from "../../classes/BaseApi";
import { ValidRequest } from "../../types/common";

export class UsersAPI extends BaseAPI {

    constructor(){
        super();

        this.registerRoutes();
    }

    public registerRoutes = () => {
        this.router.get("/", this.getUsers);
    };

    public getUsers = async (req: Request, res: Response) => {
        const request = req as ValidRequest;
        
        res.status(200).send(request ? { success: true } : { success: false });
    }

}