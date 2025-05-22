import { NextFunction, Request, Response, Router } from 'express';
import { ValidRequest } from '../types/common';

export interface CustomReq<Body = any> {
    method: 'get' | 'post' | 'update' | 'delete';
    route: string;
    middlewares?: any[];
    handler: (req: ValidRequest<Body>, res: Response) => Promise<void>;
}

export abstract class BaseAPI {
    protected readonly router: Router;

    constructor() {
        this.router = Router();
    }

    protected initRoutes = () => {
        this.requests.forEach(item => {
            const method = item.method.toLowerCase();

            // Dynamically reference the appropriate (get, post, update..etc) functions in eRouter
            (this.router as any)[method](
                item.route,
                ...(item.middlewares ?? []),
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const validRequest = req as ValidRequest;
                        await item.handler(validRequest, res);
                    } catch (error) {
                        next(error);
                    }
                },
            );
        });
    };

    protected readonly abstract requests: CustomReq[];

    public getRouter = () => this.router;
}
