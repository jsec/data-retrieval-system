import { z } from 'zod';

export const listSeasonsResponseSchema = z.array(
    z.object({
        constructorCount: z.number().int(),
        raceCount: z.number().int(),
        season: z.number().int(),
        wcc: z.object({
            id: z.string(),
            name: z.string(),
        }).nullable(),
        wdc: z.object({
            id: z.string(),
            name: z.string(),
        }),
    }));

export type ListSeasonsResponse = z.infer<typeof listSeasonsResponseSchema>;
