import { db } from '../../db/database.js';

export const getConstructorSummaries = async () => {
    return db.withSchema('effone')
        .selectFrom('constructors')
        .select([
            'constructorId as id',
            'constructorName as name',
            'primaryColorHex as color',
            'firstRaceDate',
            'lastRaceDate',
            'championshipCount as championships',
            'winCount as wins',
            'podiumCount as podiums',
        ])
        .orderBy('name')
        .execute();
};
