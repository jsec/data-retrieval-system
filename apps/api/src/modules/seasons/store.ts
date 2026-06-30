import { type ListSeasonsResponse, listSeasonsResponseSchema } from '@drs/contracts';

import { db } from '../../db/database.js';

export const listSeasons = async (): Promise<ListSeasonsResponse> => {
    const seasons = await db.withSchema('effone')
        .selectFrom('seasons')
        .select([
            'season',
            'raceCount',
            'constructorCount',
            'wdcDriverId',
            'wdcDriverName',
            'wccConstructorId',
            'wccConstructorName',
        ])
        .orderBy('season', 'desc')
        .execute();

    const dto = seasons.map((s) => {
        let wcc = null;

        if (s.wccConstructorId && s.wccConstructorName) {
            wcc = {
                id: s.wccConstructorId,
                name: s.wccConstructorName,
            };
        }

        return {
            constructorCount: s.constructorCount,
            raceCount: s.raceCount,
            season: s.season,
            wcc,
            wdc: {
                id: s.wdcDriverId,
                name: s.wdcDriverName,
            },
        };
    });

    return listSeasonsResponseSchema.parse(dto);
};
