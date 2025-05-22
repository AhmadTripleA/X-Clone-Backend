import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('comments')
        .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
        .addColumn('user_id', 'integer', (col) => col.notNull().references('users.id').onDelete('set null'))
        .addColumn('post_id', 'integer', (col) => col.notNull().references('posts.id').onDelete('set null'))
        .addColumn('content', 'json')
        .addColumn('hashtags', 'varchar(1000)')
        .addColumn('parent_comment_id', 'integer', (col) => col.defaultTo(null))
        .addColumn('like_count', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('status', 'smallint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('comments').execute();
}
