import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { circuitsRouter } from './features/circuits/circuits.router.js';
import { driversRouter } from './features/drivers/drivers.router.js';
import { seasonsRouter } from './features/seasons/season.router.js';

const app = new Hono();

app.use(logger());

app
    .route('/seasons', seasonsRouter)
    .route('/circuits', circuitsRouter)
    .route('/drivers', driversRouter);

export { app };
