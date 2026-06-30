import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import type { DB } from './db.js';

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        options: '-c search_path=effone',
    }),
});

export const db = new Kysely<DB>({
    dialect,
    plugins: [
        new CamelCasePlugin(),
    ],
});
