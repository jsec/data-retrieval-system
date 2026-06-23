-- +goose Up
create table effone.circuits (
    circuit_id integer primary key,
    circuit_ref text not null unique,
    circuit_name text not null,
    location text,
    country text,
    lat numeric,
    lng numeric,
    alt integer,
    url text not null,
    race_count integer not null default 0,
    first_race_id integer,
    first_race_name text,
    first_race_date date,
    last_race_id integer,
    last_race_name text,
    last_race_date date,
    refresh_id bigint not null references effone.refresh_runs(refresh_id)
);

create table effone.constructors (
    constructor_id integer primary key,
    constructor_ref text not null unique,
    constructor_name text not null,
    nationality text,
    url text not null,
    entry_count integer not null default 0,
    start_count integer not null default 0,
    race_entry_count integer not null default 0,
    sprint_entry_count integer not null default 0,
    race_start_count integer not null default 0,
    sprint_start_count integer not null default 0,
    win_count integer not null default 0,
    podium_count integer not null default 0,
    fastest_lap_count integer not null default 0,
    qualifying_entry_count integer not null default 0,
    qualifying_p1_count integer not null default 0,
    q3_appearance_count integer not null default 0,
    championship_count integer not null default 0,
    total_points numeric(8, 2) not null default 0,
    total_points_x100 integer not null default 0,
    first_race_id integer,
    first_race_name text,
    first_race_date date,
    last_race_id integer,
    last_race_name text,
    last_race_date date,
    refresh_id bigint not null references effone.refresh_runs(refresh_id)
);

create table effone.drivers (
    driver_id integer primary key,
    driver_ref text not null unique,
    driver_number integer,
    driver_code text,
    first_name text not null,
    last_name text not null,
    driver_name text not null,
    date_of_birth date,
    nationality text,
    url text not null,
    entry_count integer not null default 0,
    start_count integer not null default 0,
    race_entry_count integer not null default 0,
    sprint_entry_count integer not null default 0,
    race_start_count integer not null default 0,
    sprint_start_count integer not null default 0,
    win_count integer not null default 0,
    podium_count integer not null default 0,
    fastest_lap_count integer not null default 0,
    qualifying_entry_count integer not null default 0,
    qualifying_p1_count integer not null default 0,
    q3_appearance_count integer not null default 0,
    championship_count integer not null default 0,
    total_points numeric(8, 2) not null default 0,
    total_points_x100 integer not null default 0,
    first_race_id integer,
    first_race_name text,
    first_race_date date,
    last_race_id integer,
    last_race_name text,
    last_race_date date,
    refresh_id bigint not null references effone.refresh_runs(refresh_id)
);

create table effone.seasons (
    season integer primary key,
    url text not null,
    race_count integer not null default 0,
    sprint_count integer not null default 0,
    driver_count integer not null default 0,
    constructor_count integer not null default 0,
    first_race_date date,
    last_race_date date,
    wdc_driver_id integer,
    wdc_driver_name text,
    wcc_constructor_id integer,
    wcc_constructor_name text,
    refresh_id bigint not null references effone.refresh_runs(refresh_id)
);

create table effone.races (
    race_id integer primary key,
    season integer not null references effone.seasons(season),
    race_round integer not null,
    race_name text not null,
    race_date date not null,
    race_time time,
    race_url text,
    circuit_id integer not null references effone.circuits(circuit_id),
    fp1_date date,
    fp1_time time,
    fp2_date date,
    fp2_time time,
    fp3_date date,
    fp3_time time,
    qualifying_date date,
    qualifying_time time,
    sprint_date date,
    sprint_time time,
    winner_driver_id integer,
    winner_driver_name text,
    winner_constructor_id integer,
    winner_constructor_name text,
    pole_driver_id integer,
    pole_driver_name text,
    sprint_winner_driver_id integer,
    sprint_winner_driver_name text,
    sprint_winner_constructor_id integer,
    sprint_winner_constructor_name text,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    unique (season, race_round)
);

alter table effone.circuits
    add constraint circuits_first_race_id_fkey foreign key (first_race_id) references effone.races(race_id),
    add constraint circuits_last_race_id_fkey foreign key (last_race_id) references effone.races(race_id);

alter table effone.constructors
    add constraint constructors_first_race_id_fkey foreign key (first_race_id) references effone.races(race_id),
    add constraint constructors_last_race_id_fkey foreign key (last_race_id) references effone.races(race_id);

alter table effone.drivers
    add constraint drivers_first_race_id_fkey foreign key (first_race_id) references effone.races(race_id),
    add constraint drivers_last_race_id_fkey foreign key (last_race_id) references effone.races(race_id);

alter table effone.seasons
    add constraint seasons_wdc_driver_id_fkey foreign key (wdc_driver_id) references effone.drivers(driver_id),
    add constraint seasons_wcc_constructor_id_fkey foreign key (wcc_constructor_id) references effone.constructors(constructor_id);

alter table effone.races
    add constraint races_winner_driver_id_fkey foreign key (winner_driver_id) references effone.drivers(driver_id),
    add constraint races_winner_constructor_id_fkey foreign key (winner_constructor_id) references effone.constructors(constructor_id),
    add constraint races_pole_driver_id_fkey foreign key (pole_driver_id) references effone.drivers(driver_id),
    add constraint races_sprint_winner_driver_id_fkey foreign key (sprint_winner_driver_id) references effone.drivers(driver_id),
    add constraint races_sprint_winner_constructor_id_fkey foreign key (sprint_winner_constructor_id) references effone.constructors(constructor_id);

-- +goose Down
drop table if exists effone.races cascade;
drop table if exists effone.seasons cascade;
drop table if exists effone.drivers cascade;
drop table if exists effone.constructors cascade;
drop table if exists effone.circuits cascade;
