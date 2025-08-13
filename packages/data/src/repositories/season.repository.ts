import { eq, sum } from 'drizzle-orm';

import { db } from '../db/index.js';
import { constructorResults, constructors, drivers, races, results } from '../db/schema.js';

export const getDriverStandingsByYear = async (year: number) => {
    return db.select({
        driverId: drivers.id,
        firstName: drivers.firstName,
        lastName: drivers.lastName,
        points: sum(results.points),
    })
        .from(results)
        .innerJoin(drivers, eq(results.driverId, drivers.id))
        .innerJoin(races, eq(results.raceId, races.id))
        .where(eq(races.year, year))
        .groupBy(drivers.id);
};

export const getConstructorStandingsByYear = async (year: number) => {
    return db.select({
        constructorId: constructors.id,
        constructorName: constructors.name,
        points: sum(results.points),
    })
        .from(constructorResults)
        .innerJoin(races, eq(constructorResults.raceId, races.id))
        .innerJoin(constructors, eq(constructors.id, constructorResults.constructorId))
        .where(eq(races.year, year))
        .groupBy(constructors.id);
};
