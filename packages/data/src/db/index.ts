import { config } from '@hub/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(config.databaseUrl);
