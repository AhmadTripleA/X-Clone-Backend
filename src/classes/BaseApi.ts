import { Router } from "express";

export abstract class BaseAPI {
    protected router: Router;

    constructor() {
        this.router = Router()
    }

    protected abstract registerRoutes: () => void;
    
    public getRouter = () => this.router;

}