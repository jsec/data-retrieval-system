import { type ListSeasonsResponse, listSeasonsResponseSchema } from '@drs/contracts';

import { getSeasonSummaries } from './repo.js';

export const listSeasons = async (): Promise<ListSeasonsResponse> => {
    const seasons = await getSeasonSummaries();

    const dto = seasons.map((s) => {
        let wcc = null;

        if (s.wccConstructorId && s.wccConstructorName) {
            wcc = {
                color: s.wccColor,
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
