import { defineConfig } from 'kysely-ctl';
import db from './src/connections/db';

export default defineConfig({ kysely: db });
