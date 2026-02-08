import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';

import { router as seasonsRouter } from './seasons/router.js';

const app = new OpenAPIHono();

app.use(logger());

app.route('/seasons', seasonsRouter);

app.doc('/spec', {
    info: {
        title: 'DRS API Specification',
        version: '1.0.0',
    },
    openapi: '3.0.0',
});

// TODO: set port and hostname in config
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
