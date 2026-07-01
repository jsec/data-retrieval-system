import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { constructorsRouter } from './modules/constructors/routes.js';
import { seasonsRouter } from './modules/seasons/routes.js';

const app = new Hono();

app.use(logger());

app
    .route('/seasons', seasonsRouter)
    .route('/constructors', constructorsRouter);

export { app };
