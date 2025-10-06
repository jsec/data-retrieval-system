import { Hono } from 'hono';

import { getDriverStandingsBySeason } from '../data/season.repo.js';

const router = new Hono();

router.get('/:year/standings', async (c) => {
    const year = c.req.param('year');
    const standings = await getDriverStandingsBySeason(Number(year));

    return c.json({ response: standings });
});

export { router as seasonsRouter };
