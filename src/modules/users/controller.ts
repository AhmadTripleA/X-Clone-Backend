import { Response } from 'express';
import { BaseAPI, CustomReq } from '../../classes/BaseApi';
import { ValidRequest } from '../../types/common';
import { UserServices } from '../../services/user-services';

export class UsersAPI extends BaseAPI {
    constructor() {
        super();
        this.initRoutes();
    }

    protected readonly requests: CustomReq[] = [
        { route: '/:id', method: 'get', handler: getUser },
    ];
}

const getUser = async (req: ValidRequest, res: Response) => {
    const user_id = Number(req.params.id);

    const user = await UserServices.getById(user_id);

    res.status(200).send({ User: {...user, password: '#'} });
};
