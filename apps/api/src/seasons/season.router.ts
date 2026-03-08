import { Hono } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
    getConstructorStandingsBySeason,
    getDriverStandingsBySeason,
    getSeasonSummaries,
} from './season.repository.js';

const router = new Hono();

router.get('/:year/drivers/standings', async (ctx) => {
    const year = ctx.req.param('year');
    const standings = await getDriverStandingsBySeason(Number.parseInt(year));

    return ctx.json(standings, StatusCodes.OK);
});

router.get('/:year/constructors/standings', async (ctx) => {
    const year = ctx.req.param('year');
    const standings = await getConstructorStandingsBySeason(Number.parseInt(year));

    return ctx.json(standings, StatusCodes.OK);
});

router.get('/summary', async (ctx) => {
    const response = await getSeasonSummaries();
    return ctx.json(response, StatusCodes.OK);
});

export { router };
