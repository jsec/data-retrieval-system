import { config } from '@drs/shared';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(config.databaseUrl);
