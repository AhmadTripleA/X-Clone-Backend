import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('users')
        .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
        .addColumn('username', 'varchar(100)', (col) => col.notNull().unique())
        .addColumn('password', 'varchar(72)', (col) => col.notNull())
        .addColumn('first_name', 'varchar(30)', (col) => col.notNull())
        .addColumn('last_name', 'varchar(30)')
        .addColumn('phone', 'varchar(40)')
        .addColumn('email', 'varchar(255)')
        .addColumn('image_uri', 'varchar(1000)')
        .addColumn('followers_count', 'integer', (col) => col.defaultTo(0))
        .addColumn('status', 'smallint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('users').execute();
}
