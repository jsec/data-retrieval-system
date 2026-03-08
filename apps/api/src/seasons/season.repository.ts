import { SeasonSummaries } from '@drs/shared/types';
import { desc, eq, sql, sum } from 'drizzle-orm';

import {
    constructorResults,
    constructors,
    drivers,
    races,
    results,
} from '../db/schema.js';
import { db } from '../db/db.js';

// FIXME: need to get sprint points too
export const getDriverStandingsBySeason = async (year: number) => {
    return db
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
};

// FIXME: need to get sprint points too
export const getConstructorStandingsBySeason = async (year: number) => {
    return db
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
};

const getConstructorsChampions = async () => {
    const seasonTotals = db.$with('season_totals').as(
        db.select({
            constructorId: constructorResults.constructorId,
            name: constructors.name,
            seasonPoints: sum(constructorResults.points).as('season_points'),
            year: races.year,
        })
            .from(constructorResults)
            .innerJoin(races, eq(races.id, constructorResults.raceId))
            .innerJoin(constructors, eq(constructors.id, constructorResults.constructorId))
            .groupBy(races.year, constructorResults.constructorId, constructors.name),
    );

    const sortedByYear = db.$with('ranked').as(
        db.select({
            constructorId: seasonTotals.constructorId,
            name: seasonTotals.name,
            rn: sql<number>`
              ROW_NUMBER() OVER (
                              PARTITION BY ${seasonTotals.year}
                              ORDER BY ${seasonTotals.seasonPoints} DESC
                          )
            `.as('rn'),
            seasonPoints: seasonTotals.seasonPoints,
            year: seasonTotals.year,
        })
            .from(seasonTotals),
    );

    return db
        .with(seasonTotals, sortedByYear)
        .select({
            id: sortedByYear.constructorId,
            name: sortedByYear.name,
            year: sortedByYear.year,
        })
        .from(sortedByYear)
        .where(eq(sortedByYear.rn, 1))
        .orderBy(desc(sortedByYear.year));
};

const getDriversChampions = async () => {
    const driverTotals = db.$with('points_totals').as(
        db.select({
            driverId: results.driverId,
            totalPoints: sum(results.points).as('total_points'),
            wins: sql<number>`COUNT(*) FILTER (WHERE ${results.position} = 1)`.as('wins'),
            year: races.year,
        })
            .from(results)
            .innerJoin(races, eq(races.id, results.raceId))
            .groupBy(races.year, results.driverId),
    );

    const sortedByYear = db.$with('ranked').as(
        db.select({
            driverId: driverTotals.driverId,
            rank: sql<number>`
              DENSE_RANK() OVER (
                    PARTITION BY ${driverTotals.year}
                    ORDER BY ${driverTotals.totalPoints} DESC, ${driverTotals.wins} DESC
                  )
            `.as('rank'),
            totalPoints: driverTotals.totalPoints,
            year: driverTotals.year,
        })
            .from(driverTotals),
    );

    const rows = await db
        .with(driverTotals, sortedByYear)
        .select({
            firstName: drivers.firstName,
            id: sortedByYear.driverId,
            lastName: drivers.lastName,
            year: sortedByYear.year,
        })
        .from(sortedByYear)
        .innerJoin(drivers, eq(drivers.id, sortedByYear.driverId))
        .where(eq(sortedByYear.rank, 1))
        .orderBy(desc(sortedByYear.year));

    return rows.map(driver => ({
        ...driver,
        name: `${driver.firstName} ${driver.lastName}`,
    }));
};

export const getSeasonSummaries = async (): Promise<SeasonSummaries> => {
    const [driversChampions, constructorsChampions] = await Promise.all([
        getDriversChampions(),
        getConstructorsChampions(),
    ]);

    const wccByYear = new Map(constructorsChampions.map(c => [c.year, c]));

    return driversChampions.map(item => ({
        wcc: wccByYear.get(item.year),
        wdc: {
            id: item.id,
            name: item.name,
        },
        year: item.year,
    }));
};
