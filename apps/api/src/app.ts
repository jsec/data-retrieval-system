import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();
app.use(logger());

app.get('/status', (ctx) => {
    return ctx.json({
        service: true,
    });
});

export { app };
