import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import {
    getConstructorStandingsBySeason,
    getDriverStandingsBySeason,
} from './repository.js';
import {
    ConstructorStandingResponseSchema,
    DriverStandingResponseSchema,
    YearParamsSchema,
} from './schemas.js';

const driverStandingsRoute = createRoute({
    description: 'Retrieves the final drivers standings for a given year',
    method: 'get',
    path: '/{year}/drivers/standings',
    request: {
        params: YearParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: DriverStandingResponseSchema,
                },
            },
            description: 'Array of drivers and their points tallies for the year',
        },
    },
    summary: 'Get driver standings by year',
    tags: ['Seasons'],
});

const constructorStandingsRoute = createRoute({
    description: 'Retrieves the final constructors standings for a given year',
    method: 'get',
    path: '/{year}/constructors/standings',
    request: {
        params: YearParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: ConstructorStandingResponseSchema,
                },
            },
            description: 'Array of constructors and their points tallies for the year',
        },
    },
    summary: 'Get constructor standings by year',
    tags: ['Seasons'],
});

const router = new OpenAPIHono();

router.openapi(driverStandingsRoute, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getDriverStandingsBySeason(year);

    return ctx.json(standings);
});

router.openapi(constructorStandingsRoute, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getConstructorStandingsBySeason(year);

    return ctx.json(standings);
});

export { router };
