import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { defaultErrorHook, ErrorResponseSchema } from '../lib/errors.js';
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
            description: ReasonPhrases.OK,
        },
        400: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: ReasonPhrases.BAD_REQUEST,
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
            description: ReasonPhrases.OK,
        },
        400: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: ReasonPhrases.BAD_REQUEST,
        },
    },
    summary: 'Get constructor standings by year',
    tags: ['Seasons'],
});

const router = new OpenAPIHono({
    defaultHook: defaultErrorHook,
});

router.openapi(driverStandingsRoute, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getDriverStandingsBySeason(year);

    return ctx.json(standings, StatusCodes.OK);
});

router.openapi(constructorStandingsRoute, async (ctx) => {
    const { year } = ctx.req.valid('param');
    const standings = await getConstructorStandingsBySeason(year);

    return ctx.json(standings, StatusCodes.OK);
});

export { router };
