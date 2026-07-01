import { Hono } from 'hono';

import { listConstructors } from './service.js';

const app = new Hono();

app.get('/', async (c) => {
    const response = await listConstructors();
    return c.json(response);
});

export { app as constructorsRouter };
