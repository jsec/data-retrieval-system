import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';

import { getDrivers } from './drivers.repository.js';

const router = new Hono();

router.get('/', async (ctx) => {
    const response = await getDrivers();
    return ctx.json(response, StatusCodes.OK);
});

export { router as driversRouter };
