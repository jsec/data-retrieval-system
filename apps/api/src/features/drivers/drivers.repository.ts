import { db } from '#db';

export const getDrivers = () => {
    return db.selectFrom('drivers')
        .select(eb => [
            'drivers.id',
            'drivers.firstName',
            'drivers.lastName',
            'drivers.nationality',
            eb.selectFrom('races')
                .innerJoin('results', 'results.raceId', 'races.id')
                .whereRef('results.driverId', '=', 'drivers.id')
                .select('races.name')
                .orderBy('races.date', 'asc')
                .limit(1)
                .as('firstGrandPrix'),
            eb.selectFrom('races')
                .innerJoin('results', 'results.raceId', 'races.id')
                .whereRef('results.driverId', '=', 'drivers.id')
                .select(
                    'races.name')
                .orderBy('races.date', 'desc')
                .limit(1)
                .as('lastGrandPrix'),
        ])
        .execute();
};
