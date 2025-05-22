import { configDotenv } from "dotenv";
configDotenv();
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DatabaseSchema } from "./db-schema";

const { DB_MAIN_HOST, DB_MAIN_NAME, DB_MAIN_PASS, DB_MAIN_PORT, DB_MAIN_USER } = process.env;

const dialect = new PostgresDialect({
    pool: new Pool({
        host: DB_MAIN_HOST,
        port: Number(DB_MAIN_PORT),
        user: DB_MAIN_USER,
        password: DB_MAIN_PASS,
        database: DB_MAIN_NAME,
        max: 10,
    })
})

const db = new Kysely<DatabaseSchema>({ dialect, log: ["query"] })

export default db;