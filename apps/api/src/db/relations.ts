import { relations } from 'drizzle-orm/relations';

import {
    circuits,
    constructorResults,
    constructors,
    constructorStandings,
    drivers,
    driverStandings,
    lapTimes,
    pitStops,
    qualifying,
    races,
    results,
    sprintResults,
    status,
} from './schema.js';

export const racesRelations = relations(races, ({ many, one }) => ({
    circuit: one(circuits, {
        fields: [races.circuitId],
        references: [circuits.id],
    }),
    constructorResults: many(constructorResults),
    constructorStandings: many(constructorStandings),
    driverStandings: many(driverStandings),
    lapTimes: many(lapTimes),
    pitStops: many(pitStops),
    qualifyings: many(qualifying),
    results: many(results),
    sprintResults: many(sprintResults),
}));

export const circuitsRelations = relations(circuits, ({ many }) => ({
    races: many(races),
}));

export const constructorResultsRelations = relations(constructorResults, ({ one }) => ({
    constructor: one(constructors, {
        fields: [constructorResults.constructorId],
        references: [constructors.id],
    }),
    race: one(races, {
        fields: [constructorResults.raceId],
        references: [races.id],
    }),
}));

export const constructorsRelations = relations(constructors, ({ many }) => ({
    constructorResults: many(constructorResults),
    constructorStandings: many(constructorStandings),
    qualifyings: many(qualifying),
    results: many(results),
    sprintResults: many(sprintResults),
}));

export const constructorStandingsRelations = relations(constructorStandings, ({ one }) => ({
    constructor: one(constructors, {
        fields: [constructorStandings.constructorId],
        references: [constructors.id],
    }),
    race: one(races, {
        fields: [constructorStandings.raceId],
        references: [races.id],
    }),
}));

export const driverStandingsRelations = relations(driverStandings, ({ one }) => ({
    driver: one(drivers, {
        fields: [driverStandings.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [driverStandings.raceId],
        references: [races.id],
    }),
}));

export const driversRelations = relations(drivers, ({ many }) => ({
    driverStandings: many(driverStandings),
    lapTimes: many(lapTimes),
    pitStops: many(pitStops),
    qualifyings: many(qualifying),
    results: many(results),
    sprintResults: many(sprintResults),
}));

export const qualifyingRelations = relations(qualifying, ({ one }) => ({
    constructor: one(constructors, {
        fields: [qualifying.constructorId],
        references: [constructors.id],
    }),
    driver: one(drivers, {
        fields: [qualifying.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [qualifying.raceId],
        references: [races.id],
    }),
}));

export const resultsRelations = relations(results, ({ one }) => ({
    constructor: one(constructors, {
        fields: [results.constructorId],
        references: [constructors.id],
    }),
    driver: one(drivers, {
        fields: [results.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [results.raceId],
        references: [races.id],
    }),
    status: one(status, {
        fields: [results.statusId],
        references: [status.id],
    }),
}));

export const statusRelations = relations(status, ({ many }) => ({
    results: many(results),
    sprintResults: many(sprintResults),
}));

export const sprintResultsRelations = relations(sprintResults, ({ one }) => ({
    constructor: one(constructors, {
        fields: [sprintResults.constructorId],
        references: [constructors.id],
    }),
    driver: one(drivers, {
        fields: [sprintResults.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [sprintResults.raceId],
        references: [races.id],
    }),
    status: one(status, {
        fields: [sprintResults.statusId],
        references: [status.id],
    }),
}));

export const lapTimesRelations = relations(lapTimes, ({ one }) => ({
    driver: one(drivers, {
        fields: [lapTimes.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [lapTimes.raceId],
        references: [races.id],
    }),
}));

export const pitStopsRelations = relations(pitStops, ({ one }) => ({
    driver: one(drivers, {
        fields: [pitStops.driverId],
        references: [drivers.id],
    }),
    race: one(races, {
        fields: [pitStops.raceId],
        references: [races.id],
    }),
}));
