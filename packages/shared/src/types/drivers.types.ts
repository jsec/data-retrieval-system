import { z } from 'zod';

export const DriverSummarySchema = z.object({
    driverId: z.number().int(),
    firstGrandPrix: z.string().nullish(),
    firstName: z.string(),
    lastName: z.string(),
    localGrandPrix: z.string().nullish(),
    nationality: z.string().nullish(),
});

export type DriverSummary = z.infer<typeof DriverSummarySchema>;
