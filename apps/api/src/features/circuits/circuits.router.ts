import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';

import { getCircuits } from './circuits.repository.js';

const router = new Hono();

router.get('/', async (ctx) => {
    const response = await getCircuits();
    return ctx.json(response, StatusCodes.OK);
});

export { router as circuitsRouter };
