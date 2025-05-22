import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('followers')
        .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
        .addColumn('followed_user', 'integer', (col) => col.notNull().references('users.id').onDelete('set null'))
        .addColumn('followed_by', 'integer', (col) => col.notNull().references('users.id').onDelete('set null'))
        .addColumn('status', 'smallint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('followers').execute();
}
