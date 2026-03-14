import { oc } from '@orpc/contract';
import { z } from 'zod';

export const seasonSummaryContract = oc.output(
    z.array(
        z.object({
            wcc: z.object({
                id: z.number().int(),
                name: z.string(),
            }).nullish(),
            wdc: z.object({
                id: z.number().int(),
                name: z.string(),
            }),
            year: z.number().int(),
        }),
    ),
);
