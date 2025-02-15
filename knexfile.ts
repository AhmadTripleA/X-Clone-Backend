import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const { DB_MAIN_HOST, DB_MAIN_NAME, DB_MAIN_PASS, DB_MAIN_PORT, DB_MAIN_USER } = process.env;

const config: { [key: string]: Knex.Config } = {
    dev: {
        client: 'pg',
        connection: {
            host: DB_MAIN_HOST,
            port: Number(DB_MAIN_PORT),
            user: DB_MAIN_USER,
            password: DB_MAIN_PASS,
            database: DB_MAIN_NAME,
        },
        migrations: {
            directory: './migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './seeds',
            extension: 'ts',
        },
    },
};

export default config;
