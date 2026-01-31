import { getConstructorStandings, getDriverStandings } from './contracts/season.contract.js';

export * from './schemas/season.schemas.js';

export const contract = {
    season: {
        standings: {
            constructor: getConstructorStandings,
            driver: getDriverStandings,
        },
    },
};
