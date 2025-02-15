import knex from 'knex';
import knexConfig from "../../knexfile";

const environment = process.env.NODE_ENV || 'dev';
const db = knex(knexConfig[environment]);

export default db;
