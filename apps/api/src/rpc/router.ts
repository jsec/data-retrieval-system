import { contract } from '@hub/contract';
import { implement } from '@orpc/server';

import { getConstructorStandingsBySeason, getDriverStandingsBySeason } from '../data/season.repo.js';

const os = implement(contract);

const getDriverStandings = os.season.standings.driver
    .handler(async ({ input }) => {
        const result = await getDriverStandingsBySeason(input.year);
        return result;
    });

const getConstructorStandings = os.season.standings.constructor
    .handler(async ({ input }) => {
        const result = await getConstructorStandingsBySeason(input.year);
        return result;
    });

export const router = os.router({
    season: {
        standings: {
            constructor: getConstructorStandings,
            driver: getDriverStandings,
        },
    },
});
