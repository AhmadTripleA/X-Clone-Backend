import { Application } from 'express';
import { routes } from './routes';

export class Router {
    constructor(app: Application) {
        app.use(async (req, res, next) => {
            // middleware before all requests if needed

            next();
        });

        routes.forEach(module => app.use(module.path, module.middlewares, module.api.getRouter()));
    }
}
