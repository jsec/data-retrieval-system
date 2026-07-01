import { db } from '../../db/database.js';

export const getSeasonSummaries = async () => {
    return db.withSchema('effone')
        .selectFrom('seasons as s')
        .leftJoin('constructors as c', 's.wccConstructorId', 'c.constructorId')
        .select([
            's.season',
            's.raceCount',
            's.constructorCount',
            's.wdcDriverId',
            's.wdcDriverName',
            's.wccConstructorId',
            's.wccConstructorName',
            'c.primaryColorHex as wccColor',
        ])
        .orderBy('s.season', 'desc')
        .execute();
};
