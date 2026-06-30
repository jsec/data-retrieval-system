import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { seasonsRouter } from './modules/seasons/routes.js';

const app = new Hono();

app.use(logger());

app.route('/seasons', seasonsRouter);

export { app };
