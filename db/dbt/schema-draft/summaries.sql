create table effone.driver_season_summaries (
    season integer not null references effone.seasons(season),
    driver_id text not null references effone.drivers(driver_id),
    driver_name text not null,
    driver_code text not null,
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
    qualifying_position_count integer not null default 0,
    qualifying_p1_count integer not null default 0,
    average_qualifying_position numeric(6, 2),
    race_points numeric(8, 2) not null default 0,
    race_points_x100 integer not null default 0,
    sprint_points numeric(8, 2) not null default 0,
    sprint_points_x100 integer not null default 0,
    total_points numeric(8, 2) not null default 0,
    total_points_x100 integer not null default 0,
    final_position integer,
    final_position_text text,
    final_points numeric(8, 2),
    final_points_x100 integer,
    championship_won boolean not null default false,
    points_delta numeric(8, 2) not null default 0,
    points_delta_x100 integer not null default 0,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (season, driver_id)
);

create table effone.constructor_season_summaries (
    season integer not null references effone.seasons(season),
    constructor_id text not null references effone.constructors(constructor_id),
    constructor_name text not null,
    engine_manufacturer_id text,
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
    qualifying_position_count integer not null default 0,
    qualifying_p1_count integer not null default 0,
    average_qualifying_position numeric(6, 2),
    race_points numeric(8, 2) not null default 0,
    race_points_x100 integer not null default 0,
    sprint_points numeric(8, 2) not null default 0,
    sprint_points_x100 integer not null default 0,
    total_points numeric(8, 2) not null default 0,
    total_points_x100 integer not null default 0,
    final_position integer,
    final_position_text text,
    final_points numeric(8, 2),
    final_points_x100 integer,
    championship_won boolean not null default false,
    points_delta numeric(8, 2) not null default 0,
    points_delta_x100 integer not null default 0,
    refresh_id bigint not null references effone.refresh_runs(refresh_id),
    primary key (season, constructor_id)
);

comment on column effone.driver_season_summaries.final_points is 'Official points from F1DB season_driver_standing.';
comment on column effone.driver_season_summaries.total_points is 'Computed race plus sprint points from event result rows.';
comment on column effone.driver_season_summaries.points_delta is 'Difference between computed event points and official final standing points.';

comment on column effone.constructor_season_summaries.final_points is 'Official points from F1DB season_constructor_standing.';
comment on column effone.constructor_season_summaries.total_points is 'Computed race plus sprint points from event result rows.';
comment on column effone.constructor_season_summaries.points_delta is 'Difference between computed event points and official final standing points.';
