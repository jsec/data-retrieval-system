import { Hono } from 'hono';

import {
    getConstructorStandingsBySeason,
    getDriverStandingsBySeason,
} from '../data/season.repo.js';

const router = new Hono();

router.get('/:year/drivers/standings', async (c) => {
    const year = c.req.param('year');
    const standings = await getDriverStandingsBySeason(Number(year));

    return c.json({ response: standings });
});

router.get('/:year/constructors/standings', async (c) => {
    const year = c.req.param('year');
    const standings = await getConstructorStandingsBySeason(Number(year));

    return c.json({ response: standings });
});

export { router as seasonsRouter };
