import { relations } from "drizzle-orm/relations";
import { circuits, races, constructorResults, constructors, constructorStandings, driverStandings, drivers, qualifying, results, status, sprintResults, lapTimes, pitStops } from "./schema";

export const racesRelations = relations(races, ({one, many}) => ({
	circuit: one(circuits, {
		fields: [races.circuitId],
		references: [circuits.id]
	}),
	constructorResults: many(constructorResults),
	constructorStandings: many(constructorStandings),
	driverStandings: many(driverStandings),
	qualifyings: many(qualifying),
	results: many(results),
	sprintResults: many(sprintResults),
	lapTimes: many(lapTimes),
	pitStops: many(pitStops),
}));

export const circuitsRelations = relations(circuits, ({many}) => ({
	races: many(races),
}));

export const constructorResultsRelations = relations(constructorResults, ({one}) => ({
	race: one(races, {
		fields: [constructorResults.raceId],
		references: [races.id]
	}),
	constructor: one(constructors, {
		fields: [constructorResults.constructorId],
		references: [constructors.id]
	}),
}));

export const constructorsRelations = relations(constructors, ({many}) => ({
	constructorResults: many(constructorResults),
	constructorStandings: many(constructorStandings),
	qualifyings: many(qualifying),
	results: many(results),
	sprintResults: many(sprintResults),
}));

export const constructorStandingsRelations = relations(constructorStandings, ({one}) => ({
	race: one(races, {
		fields: [constructorStandings.raceId],
		references: [races.id]
	}),
	constructor: one(constructors, {
		fields: [constructorStandings.constructorId],
		references: [constructors.id]
	}),
}));

export const driverStandingsRelations = relations(driverStandings, ({one}) => ({
	race: one(races, {
		fields: [driverStandings.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [driverStandings.driverId],
		references: [drivers.id]
	}),
}));

export const driversRelations = relations(drivers, ({many}) => ({
	driverStandings: many(driverStandings),
	qualifyings: many(qualifying),
	results: many(results),
	sprintResults: many(sprintResults),
	lapTimes: many(lapTimes),
	pitStops: many(pitStops),
}));

export const qualifyingRelations = relations(qualifying, ({one}) => ({
	race: one(races, {
		fields: [qualifying.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [qualifying.driverId],
		references: [drivers.id]
	}),
	constructor: one(constructors, {
		fields: [qualifying.constructorId],
		references: [constructors.id]
	}),
}));

export const resultsRelations = relations(results, ({one}) => ({
	race: one(races, {
		fields: [results.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [results.driverId],
		references: [drivers.id]
	}),
	constructor: one(constructors, {
		fields: [results.constructorId],
		references: [constructors.id]
	}),
	status: one(status, {
		fields: [results.statusId],
		references: [status.id]
	}),
}));

export const statusRelations = relations(status, ({many}) => ({
	results: many(results),
	sprintResults: many(sprintResults),
}));

export const sprintResultsRelations = relations(sprintResults, ({one}) => ({
	race: one(races, {
		fields: [sprintResults.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [sprintResults.driverId],
		references: [drivers.id]
	}),
	constructor: one(constructors, {
		fields: [sprintResults.constructorId],
		references: [constructors.id]
	}),
	status: one(status, {
		fields: [sprintResults.statusId],
		references: [status.id]
	}),
}));

export const lapTimesRelations = relations(lapTimes, ({one}) => ({
	race: one(races, {
		fields: [lapTimes.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [lapTimes.driverId],
		references: [drivers.id]
	}),
}));

export const pitStopsRelations = relations(pitStops, ({one}) => ({
	race: one(races, {
		fields: [pitStops.raceId],
		references: [races.id]
	}),
	driver: one(drivers, {
		fields: [pitStops.driverId],
		references: [drivers.id]
	}),
}));