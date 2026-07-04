import { db } from '../../db/database.js';

export const getSeasonSummaries = async () => {
    return db.withSchema('effone')
        .selectFrom('seasons as s')
        .innerJoin('drivers as d', 's.wdcDriverId', 'd.driverId')
        .leftJoin('constructors as c', 's.wccConstructorId', 'c.constructorId')
        .select([
            's.season',
            's.raceCount',
            's.constructorCount',
            's.wdcDriverId',
            's.wdcDriverName',
            'd.nationalityCountryCode as wdcCountryCode',
            's.wccConstructorId',
            's.wccConstructorName',
            'c.primaryColorHex as wccColor',
        ])
        .orderBy('s.season', 'desc')
        .execute();
};
