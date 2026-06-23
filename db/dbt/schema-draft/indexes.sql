-- +goose Up
create index refresh_runs_status_idx on effone.refresh_runs (status);

create index circuits_first_race_id_idx on effone.circuits (first_race_id);
create index circuits_last_race_id_idx on effone.circuits (last_race_id);
create index circuits_refresh_id_idx on effone.circuits (refresh_id);

create index constructors_first_race_id_idx on effone.constructors (first_race_id);
create index constructors_last_race_id_idx on effone.constructors (last_race_id);
create index constructors_refresh_id_idx on effone.constructors (refresh_id);

create index drivers_first_race_id_idx on effone.drivers (first_race_id);
create index drivers_last_race_id_idx on effone.drivers (last_race_id);
create index drivers_refresh_id_idx on effone.drivers (refresh_id);

create index seasons_wdc_driver_id_idx on effone.seasons (wdc_driver_id);
create index seasons_wcc_constructor_id_idx on effone.seasons (wcc_constructor_id);
create index seasons_refresh_id_idx on effone.seasons (refresh_id);

create index races_season_round_idx on effone.races (season, race_round);
create index races_circuit_id_idx on effone.races (circuit_id);
create index races_race_date_idx on effone.races (race_date);
create index races_winner_driver_id_idx on effone.races (winner_driver_id);
create index races_winner_constructor_id_idx on effone.races (winner_constructor_id);
create index races_pole_driver_id_idx on effone.races (pole_driver_id);
create index races_sprint_winner_driver_id_idx on effone.races (sprint_winner_driver_id);
create index races_sprint_winner_constructor_id_idx on effone.races (sprint_winner_constructor_id);
create index races_refresh_id_idx on effone.races (refresh_id);

create index race_results_season_round_idx on effone.race_results (season, race_round);
create index race_results_season_driver_idx on effone.race_results (season, driver_id);
create index race_results_season_constructor_idx on effone.race_results (season, constructor_id);
create index race_results_driver_date_idx on effone.race_results (driver_id, race_date);
create index race_results_constructor_date_idx on effone.race_results (constructor_id, race_date);
create index race_results_status_category_season_idx on effone.race_results (status_category, season);
create index race_results_race_id_idx on effone.race_results (race_id);
create index race_results_circuit_id_idx on effone.race_results (circuit_id);
create index race_results_refresh_id_idx on effone.race_results (refresh_id);

create index sprint_results_season_driver_idx on effone.sprint_results (season, driver_id);
create index sprint_results_season_constructor_idx on effone.sprint_results (season, constructor_id);
create index sprint_results_race_id_idx on effone.sprint_results (race_id);
create index sprint_results_circuit_id_idx on effone.sprint_results (circuit_id);
create index sprint_results_refresh_id_idx on effone.sprint_results (refresh_id);

create index qualifying_results_season_driver_idx on effone.qualifying_results (season, driver_id);
create index qualifying_results_season_constructor_idx on effone.qualifying_results (season, constructor_id);
create index qualifying_results_race_id_idx on effone.qualifying_results (race_id);
create index qualifying_results_circuit_id_idx on effone.qualifying_results (circuit_id);
create index qualifying_results_refresh_id_idx on effone.qualifying_results (refresh_id);

create index lap_times_season_driver_idx on effone.lap_times (season, driver_id);
create index lap_times_season_constructor_idx on effone.lap_times (season, constructor_id);
create index lap_times_season_round_idx on effone.lap_times (season, race_round);
create index lap_times_circuit_id_idx on effone.lap_times (circuit_id);
create index lap_times_constructor_id_idx on effone.lap_times (constructor_id);
create index lap_times_refresh_id_idx on effone.lap_times (refresh_id);

create index pit_stops_season_driver_idx on effone.pit_stops (season, driver_id);
create index pit_stops_season_constructor_idx on effone.pit_stops (season, constructor_id);
create index pit_stops_circuit_id_idx on effone.pit_stops (circuit_id);
create index pit_stops_constructor_id_idx on effone.pit_stops (constructor_id);
create index pit_stops_refresh_id_idx on effone.pit_stops (refresh_id);

create index driver_standings_snapshots_season_round_idx on effone.driver_standings_snapshots (season, race_round);
create index driver_standings_snapshots_driver_idx on effone.driver_standings_snapshots (driver_id);
create index driver_standings_snapshots_refresh_id_idx on effone.driver_standings_snapshots (refresh_id);

create index constructor_standings_snapshots_season_round_idx on effone.constructor_standings_snapshots (season, race_round);
create index constructor_standings_snapshots_constructor_idx on effone.constructor_standings_snapshots (constructor_id);
create index constructor_standings_snapshots_refresh_id_idx on effone.constructor_standings_snapshots (refresh_id);

create index driver_season_summaries_driver_idx on effone.driver_season_summaries (driver_id);
create index driver_season_summaries_refresh_id_idx on effone.driver_season_summaries (refresh_id);

create index constructor_season_summaries_constructor_idx on effone.constructor_season_summaries (constructor_id);
create index constructor_season_summaries_refresh_id_idx on effone.constructor_season_summaries (refresh_id);

create index drivers_driver_name_trgm_idx on effone.drivers using gin (driver_name gin_trgm_ops);
create index drivers_driver_ref_trgm_idx on effone.drivers using gin (driver_ref gin_trgm_ops);
create index drivers_driver_code_trgm_idx on effone.drivers using gin (driver_code gin_trgm_ops);
create index constructors_constructor_name_trgm_idx on effone.constructors using gin (constructor_name gin_trgm_ops);
create index constructors_constructor_ref_trgm_idx on effone.constructors using gin (constructor_ref gin_trgm_ops);
create index circuits_circuit_name_trgm_idx on effone.circuits using gin (circuit_name gin_trgm_ops);
create index circuits_circuit_ref_trgm_idx on effone.circuits using gin (circuit_ref gin_trgm_ops);
create index circuits_country_trgm_idx on effone.circuits using gin (country gin_trgm_ops);
create index circuits_location_trgm_idx on effone.circuits using gin (location gin_trgm_ops);
create index races_race_name_trgm_idx on effone.races using gin (race_name gin_trgm_ops);

-- +goose Down
drop index if exists effone.races_race_name_trgm_idx;
drop index if exists effone.circuits_location_trgm_idx;
drop index if exists effone.circuits_country_trgm_idx;
drop index if exists effone.circuits_circuit_ref_trgm_idx;
drop index if exists effone.circuits_circuit_name_trgm_idx;
drop index if exists effone.constructors_constructor_ref_trgm_idx;
drop index if exists effone.constructors_constructor_name_trgm_idx;
drop index if exists effone.drivers_driver_code_trgm_idx;
drop index if exists effone.drivers_driver_ref_trgm_idx;
drop index if exists effone.drivers_driver_name_trgm_idx;

drop index if exists effone.constructor_season_summaries_refresh_id_idx;
drop index if exists effone.constructor_season_summaries_constructor_idx;
drop index if exists effone.driver_season_summaries_refresh_id_idx;
drop index if exists effone.driver_season_summaries_driver_idx;

drop index if exists effone.constructor_standings_snapshots_refresh_id_idx;
drop index if exists effone.constructor_standings_snapshots_constructor_idx;
drop index if exists effone.constructor_standings_snapshots_season_round_idx;
drop index if exists effone.driver_standings_snapshots_refresh_id_idx;
drop index if exists effone.driver_standings_snapshots_driver_idx;
drop index if exists effone.driver_standings_snapshots_season_round_idx;

drop index if exists effone.pit_stops_refresh_id_idx;
drop index if exists effone.pit_stops_constructor_id_idx;
drop index if exists effone.pit_stops_circuit_id_idx;
drop index if exists effone.pit_stops_season_constructor_idx;
drop index if exists effone.pit_stops_season_driver_idx;

drop index if exists effone.lap_times_refresh_id_idx;
drop index if exists effone.lap_times_constructor_id_idx;
drop index if exists effone.lap_times_circuit_id_idx;
drop index if exists effone.lap_times_season_round_idx;
drop index if exists effone.lap_times_season_constructor_idx;
drop index if exists effone.lap_times_season_driver_idx;

drop index if exists effone.qualifying_results_refresh_id_idx;
drop index if exists effone.qualifying_results_circuit_id_idx;
drop index if exists effone.qualifying_results_race_id_idx;
drop index if exists effone.qualifying_results_season_constructor_idx;
drop index if exists effone.qualifying_results_season_driver_idx;

drop index if exists effone.sprint_results_refresh_id_idx;
drop index if exists effone.sprint_results_circuit_id_idx;
drop index if exists effone.sprint_results_race_id_idx;
drop index if exists effone.sprint_results_season_constructor_idx;
drop index if exists effone.sprint_results_season_driver_idx;

drop index if exists effone.race_results_refresh_id_idx;
drop index if exists effone.race_results_circuit_id_idx;
drop index if exists effone.race_results_race_id_idx;
drop index if exists effone.race_results_status_category_season_idx;
drop index if exists effone.race_results_constructor_date_idx;
drop index if exists effone.race_results_driver_date_idx;
drop index if exists effone.race_results_season_constructor_idx;
drop index if exists effone.race_results_season_driver_idx;
drop index if exists effone.race_results_season_round_idx;

drop index if exists effone.races_refresh_id_idx;
drop index if exists effone.races_sprint_winner_constructor_id_idx;
drop index if exists effone.races_sprint_winner_driver_id_idx;
drop index if exists effone.races_pole_driver_id_idx;
drop index if exists effone.races_winner_constructor_id_idx;
drop index if exists effone.races_winner_driver_id_idx;
drop index if exists effone.races_race_date_idx;
drop index if exists effone.races_circuit_id_idx;
drop index if exists effone.races_season_round_idx;

drop index if exists effone.seasons_refresh_id_idx;
drop index if exists effone.seasons_wcc_constructor_id_idx;
drop index if exists effone.seasons_wdc_driver_id_idx;

drop index if exists effone.drivers_refresh_id_idx;
drop index if exists effone.drivers_last_race_id_idx;
drop index if exists effone.drivers_first_race_id_idx;

drop index if exists effone.constructors_refresh_id_idx;
drop index if exists effone.constructors_last_race_id_idx;
drop index if exists effone.constructors_first_race_id_idx;

drop index if exists effone.circuits_refresh_id_idx;
drop index if exists effone.circuits_last_race_id_idx;
drop index if exists effone.circuits_first_race_id_idx;

drop index if exists effone.refresh_runs_status_idx;
