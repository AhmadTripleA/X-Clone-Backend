import { Response } from 'express';
import { BaseAPI, CustomReq } from '../../classes/BaseApi';
import { ValidRequest } from '../../types/common';
import { validateData } from '../../helpers/common';
import { AuthLoginReqValidator, AuthRegisterReqValidator } from './validators';
import { AuthLoginReq, AuthRegisterReq } from './interfaces';
import { AuthService } from './service';
import { Unauthorized } from '../../helpers/errors';

export class AuthAPI extends BaseAPI {
    protected requests: CustomReq[] = [
        { route: '/register', method: 'post', handler: register },
        { route: '/login', method: 'post', handler: login },
        { route: '/refresh', method: 'get', handler: refresh },
    ];

    constructor() {
        super();
        this.initRoutes();
    }
}

const register = async (req: ValidRequest<AuthRegisterReq>, res: Response) => {
    validateData(req.body, AuthRegisterReqValidator);

    const data = await AuthService.RegisterNewUser(req.body);

    if (data) {
        res.status(200)
            .cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .send({ success: true, user: data.user, access_token: data.accessToken });
    } else {
        res.status(409).send({ success: false, message: 'Could not create user.' });
    }
};


const login = async (req: ValidRequest<AuthLoginReq>, res: Response) => {
    validateData(req.body, AuthLoginReqValidator);

    const data = await AuthService.Login(req.body);

    if (!data) throw new Unauthorized('Invalid Credientials');

    res.status(200)
        .cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send({ success: true, accessToken: data.accessToken });
};


const refresh = async (req: ValidRequest<undefined>, res: Response) => {
    const data = await AuthService.Refresh(req);

    res.status(200)
        .cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send({ success: true, accessToken: data.accessToken });
};
