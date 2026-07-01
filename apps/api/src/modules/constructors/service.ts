import { type ListConstructorsResponse, listConstructorsResponseSchema } from '@drs/contracts';

import { getConstructorSummaries } from './repo.js';

export const listConstructors = async (): Promise<ListConstructorsResponse> => {
    const constructors = await getConstructorSummaries();

    const dto = constructors.map(c => ({
        ...c,
        firstRaceDate: c.firstRaceDate?.toString(),
        lastRaceDate: c.lastRaceDate?.toString(),
    }));

    return listConstructorsResponseSchema.parse(dto);
};
