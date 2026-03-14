import { oc } from '@orpc/contract';
import { z } from 'zod';

export const circuitSummaryContract = oc.output(
    z.array(
        z.object({
            circuitId: z.number().int(),
            country: z.string().nullable(),
            firstRace: z.number().int(),
            lastRace: z.number().int(),
            name: z.string(),
        }),
    ),
);
