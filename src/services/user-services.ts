import db from '../connections/db';
import { NewUser, User } from '../connections/db-schema';

export class UserServices {
    
    public static createUser = async (new_user: NewUser): Promise<User | undefined> => {
        return db
            .insertInto('users')
            .values(new_user)
            .returningAll()
            .executeTakeFirst();
    };

    public static getById = async (id: number) => {
        return db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', String(id)).
            executeTakeFirst();
    };

    public static getByUsername = async (username: string) => {
        return db.selectFrom('users').where('username', '=', username).executeTakeFirst();
    }

    public static getUserAuth = async (username: string) => {
        return db.selectFrom('users')
            .select('id')
            .select('password')
            .where('username', '=', username)
            .executeTakeFirst();
    }
}
