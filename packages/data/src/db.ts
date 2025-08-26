import { config } from '@hub/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { DB } from './types/db.js';

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: config.databaseUrl,
    }),
});

export const db = new Kysely<DB>({ dialect });
