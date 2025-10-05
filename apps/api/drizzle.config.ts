import { config } from '@hub/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dbCredentials: {
        url: config.databaseUrl,
    },
    dialect: 'postgresql',
    out: './drizzle',
    schema: './src/db/schema.ts',
});
