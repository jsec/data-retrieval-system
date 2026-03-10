import { config } from '@drs/shared';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { DB } from './db.js';

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: config.databaseUrl,
        }),
    }),
    plugins: [
        new CamelCasePlugin(),
    ],
});
