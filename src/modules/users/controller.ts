import { Response } from 'express';
import { BaseAPI, CustomReq } from '../../classes/BaseApi';
import { ValidRequest } from '../../types/common';
import { UserServices } from '../../services/user-services';
import { validateData } from '../../helpers/common';
import { updateUserReqVal } from './validators';
import { User } from '../../connections/db-schema';

export class UsersAPI extends BaseAPI {
    constructor() {
        super();
        this.initRoutes();
    }

    protected readonly requests: CustomReq[] = [
        { route: '/:id', method: 'get', handler: getUser },
        { route: '/:id', method: 'put', handler: updateUser },
    ];
}

const getUser = async (req: ValidRequest, res: Response) => {
    const user_id = Number(req.params.id);

    const user = await UserServices.getById(user_id);

    res.status(200).send({ User: { ...user, password: '#' } });
};

const updateUser = async (req: ValidRequest<Partial<User>>, res: Response) => {
    validateData(req.body, updateUserReqVal);

    const user_id = String(req.params.id);
    const updatedUser = await UserServices.updateUser(user_id, req.body);

    res.status(200).send({ updated_user: updatedUser });
};
