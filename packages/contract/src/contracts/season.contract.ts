import { oc } from '@orpc/contract';
import * as z from 'zod';

import { ConstructorStandingSchema, DriverStandingSchema } from '../schemas/season.schemas.js';

export const getDriverStandings = oc
    .route({
        method: 'GET',
        path: '/seasons/{year}/drivers/standings',
        summary: 'Get driver standings for a single season',
        tags: ['Seasons'],
    })
    .input(z.object({
        year: z.number().int().min(1950).max(2025),
    }))
    .output(z.array(DriverStandingSchema));

export const getConstructorStandings = oc
    .route({
        method: 'GET',
        path: '/seasons/{year}/constructors/standings',
        summary: 'Get constructor standings for a single season',
        tags: ['Seasons'],
    })
    .input(z.object({
        year: z.number().int().min(1950).max(2025),
    }))
    .output(z.array(ConstructorStandingSchema));
