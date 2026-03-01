import { config } from '@drs/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(config.databaseUrl);
