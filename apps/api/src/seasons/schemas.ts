import { z } from '@hono/zod-openapi';

export const YearParamsSchema = z.object({
    year: z
        .string()
        .transform(value => Number.parseInt(value))
        .openapi({
            description: 'The year the season was contested',
            example: 2024,
            param: {
                in: 'path',
                name: 'year',
            },
        }),
});

export const DriverStandingSchema = z.object({
    driverId: z
        .number()
        .int()
        .openapi({
            description: `The driver's unique identifier`,
            example: 123,
        }),
    firstName: z
        .string()
        .openapi({
            description: `The driver's first name`,
            example: 'Lewis',
        }),
    lastName: z
        .string()
        .openapi({
            description: `The driver's last name`,
            example: 'Hamilton',
        }),
    points: z
        .number()
        .openapi({
            description: 'The number of points the driver scored in the given year',
            example: 350,
        }),
});

export const DriverStandingResponseSchema = z.array(DriverStandingSchema);

export const ConstructorStandingSchema = z.object({
    constructorId: z
        .number()
        .int()
        .openapi({
            description: `The constructor's unique identifier`,
            example: 123,
        }),
    constructorName: z
        .string()
        .openapi({
            description: 'The name of the constructor',
            example: 'McLaren',
        }),
    points: z
        .number()
        .openapi({
            description: 'The number of points the constructor scored in the given year',
        }),
});

export const ConstructorStandingResponseSchema = z.array(ConstructorStandingSchema);
