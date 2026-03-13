import { z } from 'zod';

export const DriverSummarySchema = z.object({
    driverId: z.number().int(),
    firstGrandPrix: z.string().nullish(),
    firstName: z.string(),
    lastGrandPrix: z.string().nullish(),
    lastName: z.string(),
    nationality: z.string().nullish(),
});

export type DriverSummary = z.infer<typeof DriverSummarySchema>;
