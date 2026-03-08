import { z } from 'zod';

export const SeasonSummarySchema = z.object({
    wcc: z.object({
        id: z.number().int(),
        name: z.string(),
    }).nullish(),
    wdc: z.object({
        id: z.number().int(),
        name: z.string(),
    }),
    year: z.number().int(),
});

export const SeasonSummariesSchema = z.array(SeasonSummarySchema);

export type SeasonSummaries = z.infer<typeof SeasonSummariesSchema>;
export type SeasonSummary = z.infer<typeof SeasonSummarySchema>;
