import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { handler } from './rpc.js';

const app = new Hono();

app.use(logger());

app.use('/rpc/*', async (c, next) => {
    const { matched, response } = await handler.handle(c.req.raw, {
        context: {},
        prefix: '/rpc',
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }

    await next();
});

export { app };
