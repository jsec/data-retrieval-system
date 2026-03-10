import { db } from '#db';

export const getCircuits = () => {
    return db.selectFrom('circuits')
        .innerJoin('races', 'races.circuitId', 'circuits.id')
        .select(eb => [
            'circuits.id as circuitId',
            'circuits.name as name',
            'circuits.country as country',
            eb.fn.min('races.year').as('firstRace'),
            eb.fn.max('races.year').as('lastRace'),
        ])
        .groupBy('circuits.id')
        .orderBy('circuits.name')
        .execute();
};
