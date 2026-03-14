import { contract } from '@drs/shared/contract';
import { implement } from '@orpc/server';

import { getSeasonSummaries } from './season.repository.js';

const os = implement(contract);

export const seasonSummary = os.seasons.summary.handler(async () => {
    const response = await getSeasonSummaries();
    return response;
});
