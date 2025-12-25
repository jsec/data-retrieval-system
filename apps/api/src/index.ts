import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { seasonsRouter } from './routes/season.router.js';
import { rpcHandler } from './rpc/handler.js';

const app = new Hono();

app.use(logger());

app.use('/rpc/*', async (ctx, next) => {
    const { matched, response } = await rpcHandler.handle(ctx.req.raw, {
        // TODO: determine if we need additional context
        context: {},
        prefix: '/rpc',
    });

    if (matched) {
        return ctx.newResponse(response.body, response);
    }

    await next();
});

app.route('/seasons', seasonsRouter);

serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
