import { Response } from 'express';
import { BaseAPI, CustomReq } from '../../classes/BaseApi';
import { ValidRequest } from '../../types/common';
import { NewUser } from '../../connections/db-schema';
import { UserServices } from '../../services/user-services';
import { generateUsername } from './helpers';

export class UsersAPI extends BaseAPI {
    constructor() {
        super();
        this.initRoutes();
    }

    protected readonly requests: CustomReq[] = [
        { route: '/:id', method: 'get', handler: getUser },
        { route: '/', method: 'post', handler: createUser },
    ];
}

const getUser = async (req: ValidRequest, res: Response) => {
    const user_id = Number(req.params.id);

    const user = await UserServices.getById(user_id);

    res.status(200).send({ User: user });
};

const createUser = async (req: ValidRequest, res: Response) => {
    // const { first_name, last_name, image_uri } = req.body;

    // const new_user: NewUser = {
    //     first_name: first_name || 'First',
    //     last_name: last_name || 'Last',
    //     image_uri,
    //     followers_count: 0,
    //     status: 0,
    //     username: generateUsername(first_name, last_name),
    //     updated_at: new Date(),
    // };

    // const user = await UserServices.createUser(new_user);

    res.status(200).send({ success: true });
};
