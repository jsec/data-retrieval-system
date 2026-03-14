import { oc } from '@orpc/contract';
import { z } from 'zod';

const CircuitSummarySchema = z.object({
    circuitId: z.number().int(),
    country: z.string().nullable(),
    firstRace: z.number().int(),
    lastRace: z.number().int(),
    name: z.string(),
});

export const circuitSummaryContract = oc.output(
    z.array(CircuitSummarySchema),
);

export type CircuitSummary = z.infer<typeof CircuitSummarySchema>;
