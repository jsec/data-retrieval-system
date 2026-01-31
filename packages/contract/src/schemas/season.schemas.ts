import * as z from 'zod';

export const DriverStandingSchema = z.object({
    driverId: z.number().int(),
    firstName: z.string(),
    lastName: z.string(),
    points: z.number(),
});

export const ConstructorStandingSchema = z.object({
    constructorId: z.number().int(),
    constructorName: z.string(),
    points: z.number(),
});

export type ConstructorStanding = z.infer<typeof ConstructorStandingSchema>;
export type DriverStanding = z.infer<typeof DriverStandingSchema>;
