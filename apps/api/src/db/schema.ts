import {
    bigint,
    boolean,
    date,
    foreignKey,
    integer,
    numeric,
    pgTable,
    primaryKey,
    serial,
    text,
    time,
    timestamp,
    unique,
} from 'drizzle-orm/pg-core';

export const gooseDbVersion = pgTable('goose_db_version', {
    id: serial().primaryKey().notNull(),
    isApplied: boolean('is_applied').notNull(),
    tstamp: timestamp({ mode: 'string' }).defaultNow(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    versionId: bigint('version_id', { mode: 'number' }).notNull(),
});

export const seasons = pgTable('seasons', {
    url: text().notNull(),
    year: integer().notNull(),
}, table => [
    unique('seasons_url_key').on(table.url),
]);

export const circuits = pgTable('circuits', {
    alt: integer(),
    country: text(),
    id: integer().primaryKey().notNull(),
    lat: numeric(),
    lng: numeric(),
    location: text(),
    name: text().notNull(),
    ref: text().notNull(),
    url: text().notNull(),
}, table => [
    unique('circuits_url_key').on(table.url),
]);

export const races = pgTable('races', {
    circuitId: integer('circuit_id').notNull(),
    date: date().notNull(),
    fp1Date: date('fp1_date'),
    fp1Time: time('fp1_time'),
    fp2Date: date('fp2_date'),
    fp2Time: time('fp2_time'),
    fp3Date: date('fp3_date'),
    fp3Time: time('fp3_time'),
    id: integer().primaryKey().notNull(),
    name: text().default('').notNull(),
    qualiDate: date('quali_date'),
    qualiTime: time('quali_time'),
    round: integer().default(0).notNull(),
    sprintDate: date('sprint_date'),
    sprintTime: time('sprint_time'),
    time: time(),
    url: text(),
    year: integer().notNull(),
}, table => [
    foreignKey({
        columns: [table.circuitId],
        foreignColumns: [circuits.id],
        name: 'races_circuit_id_fkey',
    }),
    unique('races_url_key').on(table.url),
]);

export const constructorResults = pgTable('constructor_results', {
    constructorId: integer('constructor_id').notNull(),
    id: integer().primaryKey().notNull(),
    points: numeric(),
    raceId: integer('race_id').notNull(),
    status: text(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'constructor_results_race_id_fkey',
    }),
    foreignKey({
        columns: [table.constructorId],
        foreignColumns: [constructors.id],
        name: 'constructor_results_constructor_id_fkey',
    }),
]);

export const constructors = pgTable('constructors', {
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    nationality: text(),
    ref: text().notNull(),
    url: text().notNull(),
}, table => [
    unique('constructors_name_key').on(table.name),
]);

export const constructorStandings = pgTable('constructor_standings', {
    constructorId: integer('constructor_id').notNull(),
    id: integer().primaryKey().notNull(),
    points: numeric().notNull(),
    position: integer(),
    posText: text('pos_text'),
    raceId: integer('race_id').notNull(),
    wins: integer().default(0).notNull(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'constructor_standings_race_id_fkey',
    }),
    foreignKey({
        columns: [table.constructorId],
        foreignColumns: [constructors.id],
        name: 'constructor_standings_constructor_id_fkey',
    }),
]);

export const driverStandings = pgTable('driver_standings', {
    driverId: integer('driver_id').notNull(),
    id: integer().primaryKey().notNull(),
    points: numeric().default('0').notNull(),
    position: integer(),
    posText: text('pos_text'),
    raceId: integer('race_id').notNull(),
    wins: integer().default(0),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'driver_standings_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'driver_standings_driver_id_fkey',
    }),
]);

export const drivers = pgTable('drivers', {
    code: text(),
    dateOfBirth: date('date_of_birth'),
    firstName: text('first_name').default('').notNull(),
    id: integer().primaryKey().notNull(),
    lastName: text('last_name').default('').notNull(),
    nationality: text(),
    number: integer(),
    ref: text().default('').notNull(),
    url: text().notNull(),
}, table => [
    unique('drivers_url_key').on(table.url),
]);

export const qualifying = pgTable('qualifying', {
    constructorId: integer('constructor_id').notNull(),
    driverId: integer('driver_id').notNull(),
    id: integer().primaryKey().notNull(),
    number: integer().default(0).notNull(),
    position: integer(),
    q1: text(),
    q2: text(),
    q3: text(),
    raceId: integer('race_id').notNull(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'qualifying_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'qualifying_driver_id_fkey',
    }),
    foreignKey({
        columns: [table.constructorId],
        foreignColumns: [constructors.id],
        name: 'qualifying_constructor_id_fkey',
    }),
]);

export const results = pgTable('results', {
    constructorId: integer('constructor_id').notNull(),
    driverId: integer('driver_id').notNull(),
    fastestLap: integer('fastest_lap'),
    fastestLapSpeed: text('fastest_lap_speed'),
    fastestLapTime: text('fastest_lap_time'),
    grid: integer().default(0).notNull(),
    id: integer().primaryKey().notNull(),
    laps: integer().default(0).notNull(),
    milliseconds: integer(),
    number: integer(),
    points: numeric().default('0').notNull(),
    position: integer(),
    posOrder: integer('pos_order').default(0).notNull(),
    posText: text('pos_text').default('').notNull(),
    raceId: integer('race_id').notNull(),
    rank: integer().default(0),
    statusId: integer('status_id'),
    time: text(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'results_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'results_driver_id_fkey',
    }),
    foreignKey({
        columns: [table.constructorId],
        foreignColumns: [constructors.id],
        name: 'results_constructor_id_fkey',
    }),
    foreignKey({
        columns: [table.statusId],
        foreignColumns: [status.id],
        name: 'results_status_id_fkey',
    }),
]);

export const status = pgTable('status', {
    id: integer().primaryKey().notNull(),
    status: text().default('').notNull(),
});

export const sprintResults = pgTable('sprint_results', {
    constructorId: integer('constructor_id').notNull(),
    driverId: integer('driver_id').notNull(),
    fastestLap: integer('fastest_lap'),
    fastestLapTime: text('fastest_lap_time'),
    grid: integer().default(0).notNull(),
    id: integer().primaryKey().notNull(),
    laps: integer().default(0).notNull(),
    milliseconds: integer(),
    number: integer().default(0).notNull(),
    points: numeric().default('0').notNull(),
    position: integer(),
    posOrder: integer('pos_order').default(0).notNull(),
    posText: text('pos_text').default('').notNull(),
    raceId: integer('race_id').notNull(),
    statusId: integer('status_id'),
    time: text(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'sprint_results_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'sprint_results_driver_id_fkey',
    }),
    foreignKey({
        columns: [table.constructorId],
        foreignColumns: [constructors.id],
        name: 'sprint_results_constructor_id_fkey',
    }),
    foreignKey({
        columns: [table.statusId],
        foreignColumns: [status.id],
        name: 'sprint_results_status_id_fkey',
    }),
]);

export const lapTimes = pgTable('lap_times', {
    driverId: integer('driver_id').notNull(),
    lap: integer().notNull(),
    milliseconds: integer(),
    position: integer(),
    raceId: integer('race_id').notNull(),
    time: text(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'lap_times_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'lap_times_driver_id_fkey',
    }),
    primaryKey({ columns: [table.raceId, table.driverId, table.lap], name: 'lap_times_pkey' }),
]);

export const pitStops = pgTable('pit_stops', {
    driverId: integer('driver_id').notNull(),
    duration: text(),
    lap: integer().notNull(),
    milliseconds: integer(),
    raceId: integer('race_id').notNull(),
    stop: integer().notNull(),
    time: time().notNull(),
}, table => [
    foreignKey({
        columns: [table.raceId],
        foreignColumns: [races.id],
        name: 'pit_stops_race_id_fkey',
    }),
    foreignKey({
        columns: [table.driverId],
        foreignColumns: [drivers.id],
        name: 'pit_stops_driver_id_fkey',
    }),
    primaryKey({ columns: [table.raceId, table.driverId, table.stop], name: 'pit_stops_pkey' }),
]);
