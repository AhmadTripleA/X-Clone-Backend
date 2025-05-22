import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('hashtags')
        .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
        .addColumn('value', 'varchar(100)', (col) => col.notNull())
        .addColumn('post_id', 'integer', (col) => col.notNull().references('posts.id').onDelete('set null'))
        .addColumn('status', 'smallint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('hashtags').execute();
}
