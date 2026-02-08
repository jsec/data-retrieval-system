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
            description: 'Retrieves the final drivers standings for a given year',
        },
    },
    tags: ['Seasons'],
});

const constructorStandingsRoute = createRoute({
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
            description: 'Retrieves the final constructors standings for a given year',
        },
    },
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
