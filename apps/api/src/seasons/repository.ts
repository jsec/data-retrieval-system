import { desc, eq, sum } from 'drizzle-orm';

import {
    constructorResults,
    constructors,
    drivers,
    races,
    results,
} from '../../drizzle/schema.js';
import { db } from '../data/db.js';

// FIXME: need to get sprint points too
export const getDriverStandingsBySeason = async (year: number) => {
    try {
        const result = await db
            .select({
                driverId: drivers.id,
                firstName: drivers.firstName,
                lastName: drivers.lastName,
                points: sum(results.points).mapWith(Number),
            })
            .from(results)
            .innerJoin(drivers, eq(results.driverId, drivers.id))
            .innerJoin(races, eq(results.raceId, races.id))
            .where(eq(races.year, year))
            .groupBy(drivers.id)
            .orderBy(desc(sum(results.points)));

        return result;
    } catch (error) {
        // TODO: better error handling
        console.error('Error fetching driver standings', error);
        throw error;
    }
};

// TODO: figure out if we need sprint points here too
export const getConstructorStandingsBySeason = async (year: number) => {
    try {
        const result = await db
            .select({
                constructorId: constructors.id,
                constructorName: constructors.name,
                points: sum(constructorResults.points).mapWith(Number),
            })
            .from(constructorResults)
            .innerJoin(constructors, eq(constructorResults.constructorId, constructors.id))
            .innerJoin(races, eq(constructorResults.raceId, races.id))
            .where(eq(races.year, year))
            .groupBy(constructors.id)
            .orderBy(desc(sum(constructorResults.points)));

        return result;
    } catch (error) {
        // TODO: better error handling
        console.error('Error fetching driver standings', error);
        throw error;
    }
};
