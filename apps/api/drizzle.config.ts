import { config } from '@drs/shared';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dbCredentials: {
        url: config.databaseUrl,
    },
    dialect: 'postgresql',
    out: './drizzle',
    schema: './src/db/schema.ts',
});
