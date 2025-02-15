import { Application } from "express";
import { routes } from "./routes";

export class Router {
    constructor(app: Application) {
        app.use(async (req, res, next) => {
            // authenticate each request

            next();
        })

        routes.forEach(module => {
            if (module.middlewares)
                app.use(module.path, module.middlewares, module.api.getRouter());
            else
                app.use(module.path, module.api.getRouter());
        });
    }
}