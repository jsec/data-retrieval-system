import { oc } from '@orpc/contract';
import { z } from 'zod';

const DriverSummarySchema = z.object({
    driverId: z.number().int(),
    firstGrandPrix: z.string().nullish(),
    firstName: z.string(),
    lastGrandPrix: z.string().nullish(),
    lastName: z.string(),
    nationality: z.string().nullish(),
});

export const driverSummaryContract = oc.output(
    z.array(DriverSummarySchema),
);

export type DriverSummary = z.infer<typeof DriverSummarySchema>;
