import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import { BadRequest, NotFound, Unauthorized } from '../helpers/errors';

export const GlobalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const message = err instanceof Error ? err.message : 'Unknown Error';

    let status: number = 500;
    let error_type: string = 'Internal Server Error';

    if (err instanceof BadRequest) {
        status = 400;
        error_type = 'Bad Request';
    } else if (err instanceof NotFound) {
        status = 404;
        error_type = 'Not Found';
    } else if (err instanceof Unauthorized) {
        status = 401;
        error_type = 'Unauthorized';
    } else {
        status = 500;
        error_type = 'Internal Server Error';
    }

    const globalLog = {
        status,
        message,
        url: req.url,
        method: req.method,
        cURL: generateCurl(req),
        error_stack: err instanceof Error ? err.stack : undefined,
    };

    console.error(message, err);

    logger.error(message, globalLog);

    res.status(status).send({ Error: process.env.NODE_ENV == 'production' ? error_type : globalLog });
};

function generateCurl(req: Request): string {
    const req_headers = structuredClone(req.headers);
    if (req_headers['content-length']) delete req_headers['content-length'];

    const headers = Object.entries(req_headers)
        .map(([key, value]) => `-H '${key}: ${value}'`)
        .join(' ');

    const method = `-X ${req.method}`;
    const url = decodeURIComponent(`${req.protocol}://${req.hostname}${req.originalUrl}`);
    const body = req.body && Object.keys(req.body).length > 0 ? `-d '${JSON.stringify(req.body)}'` : '';

    return `curl ${method} ${headers} ${body} '${url}'`.trim();
}
