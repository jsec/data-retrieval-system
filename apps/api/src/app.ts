import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { router as seasonsRouter } from './seasons/season.router.js';

const app = new Hono();

app.use(logger());

app.route('/seasons', seasonsRouter);

export { app };
