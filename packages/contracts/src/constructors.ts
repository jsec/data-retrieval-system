import { z } from 'zod';

export const listConstructorsResponseSchema = z.array(
    z.object({
        championships: z.number().int(),
        color: z.string(),
        firstRaceDate: z.iso.date().nullish(),
        id: z.string(),
        lastRaceDate: z.iso.date().nullish(),
        name: z.string(),
        podiums: z.number().int(),
        wins: z.number().int(),
    }),
);

export type ListConstructorsResponse = z.infer<typeof listConstructorsResponseSchema>;
