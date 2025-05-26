import { NextFunction, Request, Response } from 'express';
import { ValidRequest } from '../types/common';
import { Unauthorized } from '../helpers/errors';
import { verifyAccessToken } from '../utils/jwt';

export class AuthenticationMW {
    public validToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')?.[1] ?? '';
            const payload = verifyAccessToken(token);
            const request = req as ValidRequest;
            request.user_id = typeof payload == 'string' ? 0 : Number(payload.sub);

            if (!request.user_id) throw new Error();

            next();
        } catch (_) {
            next(new Unauthorized('Invalid Token'));
        }
    };
}
