import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('posts')
        .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
        .addColumn('user_id', 'integer', (col) => col.notNull().references('users.id').onDelete('set null'))
        .addColumn('content', 'json')
        .addColumn('hashtags', 'varchar(1000)')
        .addColumn('parent_post_id', 'integer', (col) => col.defaultTo(null))
        .addColumn('is_repost', 'boolean', (col) => col.notNull().defaultTo(false))
        .addColumn('retweet_count', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('like_count', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('comment_count', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('visibility', 'smallint', (col) => col.notNull().defaultTo(0))
        .addColumn('status', 'smallint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('posts').execute();
}
