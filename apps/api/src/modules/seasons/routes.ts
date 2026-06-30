import { Hono } from 'hono';

import { listSeasons } from './store.js';

const app = new Hono();

app.get('/', async (c) => {
    const response = await listSeasons();
    return c.json(response);
});

export { app as seasonsRouter };
