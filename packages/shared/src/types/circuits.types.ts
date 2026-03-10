import z from 'zod';

export const CircuitSummarySchema = z.object({
    circuitId: z.number().int(),
    country: z.string(),
    firstRace: z.number().int(),
    lastRace: z.number().int(),
    name: z.string(),
});

export type CircuitSummary = z.infer<typeof CircuitSummarySchema>;
