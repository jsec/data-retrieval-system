import { db } from '#db';
import { SeasonSummaries } from '@drs/shared/types';
import { sql } from 'kysely';

// FIXME: need to get sprint points too
export const getDriverStandingsBySeason = async (year: number) => {
    return db.selectFrom('results')
        .innerJoin('drivers', 'results.driverId', 'drivers.id')
        .innerJoin('races', 'results.raceId', 'races.id')
        .where('races.year', '=', year)
        .select(eb => [
            'drivers.id as driverId',
            'drivers.firstName as firstName',
            'drivers.lastName as lastName',
            eb.fn.sum<number>('results.points').as('points'),
        ])
        .groupBy('drivers.id')
        .orderBy('points', 'desc')
        .execute();
};

// FIXME: need to get sprint points too
export const getConstructorStandingsBySeason = async (year: number) => {
    return db.selectFrom('constructorResults')
        .innerJoin('constructors', 'constructorResults.constructorId', 'constructors.id')
        .innerJoin('races', 'constructorResults.raceId', 'races.id')
        .where('races.year', '=', year)
        .select(eb => [
            'constructors.id as constructorId',
            'constructors.name as constructorName',
            eb.fn.sum<number>('constructorResults.points').as('points'),
        ])
        .groupBy('constructors.id')
        .orderBy('points', 'desc')
        .execute();
};

const getConstructorsChampions = async () => {
    return db
        .with('wdc_totals', db =>
            db.selectFrom('constructorResults')
                .innerJoin('races', 'races.id', 'constructorResults.raceId')
                .innerJoin('constructors', 'constructors.id', 'constructorResults.constructorId')
                .groupBy(['races.year', 'constructorResults.constructorId', 'constructors.name'])
                .select(eb => [
                    'constructorResults.constructorId',
                    'constructors.name',
                    eb.fn.sum('constructorResults.points').as('season_points'),
                    'races.year',
                ]),
        )
        .with('ranked', db =>
            db.selectFrom('wdc_totals')
                .select([
                    'constructorId',
                    'name',
                    'season_points',
                    'year',
                    sql<number>`ROW_NUMBER() OVER (PARTITION BY year ORDER BY season_points DESC)`.as('rn'),
                ]),
        )
        .selectFrom('ranked')
        .select(['constructorId as id', 'name', 'year'])
        .where('rn', '=', 1)
        .orderBy('year', 'desc')
        .execute();
};

const getDriversChampions = async () => {
    return db
        .with('wcc_totals', db =>
            db.selectFrom('results')
                .innerJoin('races', 'races.id', 'results.raceId')
                .groupBy(['races.year', 'results.driverId'])
                .select(eb => [
                    'results.driverId',
                    eb.fn.sum('results.points').as('total_points'),
                    sql<number>`COUNT(*) FILTER (WHERE results.position = 1)`.as('wins'),
                    'races.year',
                ]),
        )
        .with('ranked', db =>
            db.selectFrom('wcc_totals')
                .select([
                    'driverId',
                    'year',
                    sql<number>`DENSE_RANK() OVER (PARTITION BY year ORDER BY total_points DESC, wins DESC)`.as('rank'),
                ]),
        )
        .selectFrom('ranked')
        .innerJoin('drivers', 'drivers.id', 'ranked.driverId')
        .select([
            'drivers.firstName',
            'ranked.driverId as id',
            'drivers.lastName',
            'ranked.year',
        ])
        .where('rank', '=', 1)
        .orderBy('ranked.year', 'desc')
        .execute();
};

export const getSeasonSummaries = async (): Promise<SeasonSummaries> => {
    const [driversChampions, constructorsChampions] = await Promise.all([
        getDriversChampions(),
        getConstructorsChampions(),
    ]);

    return driversChampions.map((wdc, idx) => {
        const wcc = constructorsChampions[idx];

        return {
            wcc,
            wdc: {
                id: wdc.id,
                name: `${wdc.firstName} ${wdc.lastName}`,
            },
            year: wdc.year,
        };
    });
};
