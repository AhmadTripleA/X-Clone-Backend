import { NewUser } from '../../connections/db-schema';
import { BadRequest, Unauthorized } from '../../helpers/errors';
import { ValidRequest } from '../../types/common';
import { UserServices } from '../../services/user-services';
import { comparePassword, hashPassword } from '../../utils/hashing';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AuthLoginReq, AuthRegisterReq } from './interfaces';

export class AuthService {
    public static async RegisterNewUser(data: AuthRegisterReq) {
        const [hashedPass, existingUser] = await Promise.all([
            hashPassword(data.password),
            UserServices.getByUsername(data.username),
        ]);

        if (existingUser) return;

        const newUser: NewUser = {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: hashedPass,

            status: 1,
            followers_count: 0,
            image_uri: null,
            phone: null,
        };

        const user = await UserServices.createUser(newUser);

        if (user) {
            const accessToken = signAccessToken(user.id);
            const refreshToken = signRefreshToken(user.id);

            return { user, accessToken, refreshToken };
        }
    }

    public static async Login(data: AuthLoginReq) {
        const { username, password } = data;

        const user = await UserServices.getUserAuth(username);
        if (!user || !(await comparePassword(password, user.password))) {
            return null;
        }

        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);

        return { refreshToken, accessToken };
    }

    public static async Refresh(request: ValidRequest) {
        const refreshToken = request.cookies?.['refreshToken'];
        if (!refreshToken) throw new BadRequest('No refresh token');

        const payload = verifyRefreshToken(refreshToken.toString());

        const sub = typeof payload == 'string' ? payload : payload.sub;
        if (!sub) {
            throw new Unauthorized('Invalid user id in token');
        }

        const accessToken = signAccessToken(sub);
        const newRefreshToken = signRefreshToken(sub);

        return { refreshToken: newRefreshToken, accessToken };
    }
}
