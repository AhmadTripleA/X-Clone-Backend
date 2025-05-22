import db from '../connections/db';
import { NewPost, Post } from '../connections/db-schema';

export class PostServices {

    public createNewPost = async (newPost: NewPost): Promise<Post | undefined> => {
        return db
            .insertInto('posts')
            .values(newPost)
            .returningAll()
            .executeTakeFirst();
    };

    public getById = async (id: number) => {
        return db
            .selectFrom('posts')
            .selectAll()
            .where('id', '=', String(id)).
            executeTakeFirst();
    };
}
