-- +goose Up
create table effone.race_results (
    result_id integer primary key,
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    race_name text not null,
    race_date date not null,
    circuit_id integer not null references effone.circuits(circuit_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    car_number integer,
    grid_position integer not null default 0,
    finish_position integer,
    finish_order integer not null,
    position_text text not null,
    positions_gained integer,
    points numeric(8, 2) not null default 0,
    points_x100 integer not null default 0,
    laps_completed integer not null default 0,
    elapsed_time text,
    elapsed_time_ms integer,
    fastest_lap_number integer,
    fastest_lap_rank integer,
    fastest_lap_time text,
    fastest_lap_time_ms integer,
    fastest_lap_speed text,
    fastest_lap_speed_kph numeric(8, 3),
    status_id integer,
    status text,
    status_category text not null check (
        status_category in (
            'finished',
            'classified_lapped',
            'accident',
            'collision',
            'mechanical',
            'driver_error',
            'disqualified',
            'not_qualified',
            'not_classified',
            'withdrawn',
            'other_retirement',
            'unknown'
        )
    ),
    is_entry boolean not null default true,
    is_start boolean not null,
    is_dnf boolean not null,
    is_classified_finish boolean not null,
    is_win boolean not null,
    is_podium boolean not null,
    is_points_finish boolean not null,
    is_grid_p1 boolean not null,
    is_fastest_lap boolean not null,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    unique (race_id, driver_id)
);

create table effone.sprint_results (
    sprint_result_id integer primary key,
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    race_name text not null,
    race_date date not null,
    circuit_id integer not null references effone.circuits(circuit_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    car_number integer not null default 0,
    grid_position integer not null default 0,
    finish_position integer,
    finish_order integer not null,
    position_text text not null,
    positions_gained integer,
    points numeric(8, 2) not null default 0,
    points_x100 integer not null default 0,
    laps_completed integer not null default 0,
    elapsed_time text,
    elapsed_time_ms integer,
    fastest_lap_number integer,
    fastest_lap_time text,
    fastest_lap_time_ms integer,
    status_id integer,
    status text,
    status_category text not null check (
        status_category in (
            'finished',
            'classified_lapped',
            'accident',
            'collision',
            'mechanical',
            'driver_error',
            'disqualified',
            'not_qualified',
            'not_classified',
            'withdrawn',
            'other_retirement',
            'unknown'
        )
    ),
    is_entry boolean not null default true,
    is_start boolean not null,
    is_dnf boolean not null,
    is_classified_finish boolean not null,
    is_win boolean not null,
    is_podium boolean not null,
    is_points_finish boolean not null,
    is_grid_p1 boolean not null,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    unique (race_id, driver_id)
);

create table effone.qualifying_results (
    qualifying_id integer primary key,
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    race_name text not null,
    race_date date not null,
    circuit_id integer not null references effone.circuits(circuit_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    car_number integer not null default 0,
    qualifying_position integer,
    q1 text,
    q1_ms integer,
    q2 text,
    q2_ms integer,
    q3 text,
    q3_ms integer,
    best_qualifying_ms integer,
    is_entry boolean not null default true,
    advanced_to_q2 boolean not null,
    advanced_to_q3 boolean not null,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    unique (race_id, driver_id)
);

create table effone.lap_times (
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    circuit_id integer not null references effone.circuits(circuit_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    lap_number integer not null,
    lap_position integer,
    lap_time text,
    lap_time_ms integer,
    lap_rank_on_lap integer,
    lap_rank_for_driver integer,
    race_fastest_lap_ms integer,
    gap_to_race_fastest_ms integer,
    lap_fastest_on_lap_ms integer,
    gap_to_lap_fastest_ms integer,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (race_id, driver_id, lap_number)
);

create table effone.pit_stops (
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    circuit_id integer not null references effone.circuits(circuit_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    stop_number integer not null,
    lap_number integer not null,
    stop_time time not null,
    duration text,
    duration_ms integer,
    pit_stop_rank_in_race integer,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (race_id, driver_id, stop_number)
);

create table effone.driver_standings_snapshots (
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    driver_id integer not null references effone.drivers(driver_id),
    driver_ref text not null,
    driver_name text not null,
    driver_code text,
    points numeric(8, 2) not null default 0,
    points_x100 integer not null default 0,
    previous_points numeric(8, 2),
    previous_points_x100 integer,
    points_gained numeric(8, 2),
    points_gained_x100 integer,
    position integer,
    position_text text,
    previous_position integer,
    position_change integer,
    wins integer not null default 0,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (race_id, driver_id)
);

create table effone.constructor_standings_snapshots (
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_id integer not null references effone.races(race_id),
    constructor_id integer not null references effone.constructors(constructor_id),
    constructor_ref text not null,
    constructor_name text not null,
    points numeric(8, 2) not null default 0,
    points_x100 integer not null default 0,
    previous_points numeric(8, 2),
    previous_points_x100 integer,
    points_gained numeric(8, 2),
    points_gained_x100 integer,
    position integer,
    position_text text,
    previous_position integer,
    position_change integer,
    wins integer not null default 0,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (race_id, constructor_id)
);

comment on column effone.race_results.finish_position is 'Position at the conclusion of the race.';
comment on column effone.race_results.finish_order is 'Official result order after classification and penalties; use for wins, podiums, and result sorting.';
comment on column effone.race_results.positions_gained is 'grid_position minus finish_order when both positions are positive.';
comment on column effone.race_results.points_x100 is 'Integer representation of points multiplied by 100.';
comment on column effone.race_results.status_category is 'Status category derived from the raw source status.';
comment on column effone.race_results.is_dnf is 'True only for started race entries that did not finish; DNQ, DNS, and withdrawals are not DNFs.';
comment on column effone.race_results.is_grid_p1 is 'True when the entry started first on the grid; not necessarily qualifying P1.';

comment on column effone.sprint_results.finish_position is 'Position at the conclusion of a sprint race.';
comment on column effone.sprint_results.finish_order is 'Official sprint result order after classification and penalties.';
comment on column effone.sprint_results.points_x100 is 'Integer representation of sprint points multiplied by 100.';
comment on column effone.sprint_results.status_category is 'Status category derived from the raw source sprint status.';

comment on column effone.qualifying_results.advanced_to_q2 is 'Derived from a non-null Q2 time.';
comment on column effone.qualifying_results.advanced_to_q3 is 'Derived from a non-null Q3 time.';

comment on column effone.lap_times.lap_rank_on_lap is 'Dense rank of the lap time within the same race and lap number.';
comment on column effone.lap_times.lap_rank_for_driver is 'Dense rank of the lap time within the same race and driver.';
comment on column effone.lap_times.gap_to_race_fastest_ms is 'Gap to the fastest lap time across the whole race.';
comment on column effone.lap_times.gap_to_lap_fastest_ms is 'Gap to the fastest lap time for the same lap number.';

comment on column effone.pit_stops.pit_stop_rank_in_race is 'Dense rank of pit-stop duration within the race.';

comment on column effone.driver_standings_snapshots.position_change is 'Movement from previous race standings.';
comment on column effone.driver_standings_snapshots.points_gained is 'Points gained since the previous race standings snapshot.';
comment on column effone.constructor_standings_snapshots.position_change is 'Movement from previous race standings.';
comment on column effone.constructor_standings_snapshots.points_gained is 'Points gained since the previous race standings snapshot.';

-- +goose Down
drop table if exists effone.constructor_standings_snapshots;
drop table if exists effone.driver_standings_snapshots;
drop table if exists effone.pit_stops;
drop table if exists effone.lap_times;
drop table if exists effone.qualifying_results;
drop table if exists effone.sprint_results;
drop table if exists effone.race_results;
