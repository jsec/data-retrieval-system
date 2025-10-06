import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { seasonsRouter } from './routes/season.router.js';

const app = new Hono();

app.use(logger());

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

app.route('/seasons', seasonsRouter);

serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
