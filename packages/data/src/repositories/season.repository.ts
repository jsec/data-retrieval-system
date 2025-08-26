import { db } from '../db.js';

export const getDriverPointsByYear = async (year: number) => {
    return db.selectFrom('results')
        .innerJoin('drivers', 'drivers.id', 'results.driverId')
        .innerJoin('races', 'results.raceId', 'races.id')
        .where('races.year', '=', year)
        .groupBy('drivers.id')
        .select([
            'drivers.id as driverId',
            'drivers.firstName',
            'drivers.lastName',
            eb => eb.fn.sum('results.points').as('points'),
        ])
        .execute();
};

export const getConstructorPointsByYer = async (year: number) => {
    return db.selectFrom('constructorResults as cr')
        .innerJoin('constructors as c', 'c.id', 'cr.constructorId')
        .innerJoin('races as r', 'r.id', 'cr.raceId')
        .where('r.year', '=', year)
        .groupBy('c.id')
        .select([
            'c.id as constructorId',
            'c.name as constructorName',
            eb => eb.fn.sum('cr.points').as('points'),
        ])
        .execute();
};
