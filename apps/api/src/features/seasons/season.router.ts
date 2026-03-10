import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import {
    getConstructorStandingsBySeason,
    getDriverStandingsBySeason,
    getSeasonSummaries,
} from './season.repository.js';

const yearSchema = z.coerce.number().int().positive();

const validateYear = validator('param', (value, ctx) => {
    const result = yearSchema.safeParse(value['year']);
    if (!result.success) {
        return ctx.json({ error: 'Invalid year' }, StatusCodes.BAD_REQUEST);
    }
    return { year: result.data };
});

const router = new Hono();

router.get('/:year/drivers/standings', validateYear, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getDriverStandingsBySeason(year);
    return ctx.json(standings, StatusCodes.OK);
});

router.get('/:year/constructors/standings', validateYear, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getConstructorStandingsBySeason(year);
    return ctx.json(standings, StatusCodes.OK);
});

router.get('/summary', async (ctx) => {
    const response = await getSeasonSummaries();
    return ctx.json(response, StatusCodes.OK);
});

export { router as seasonsRouter };
