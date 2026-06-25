with drivers as (
    select * from {{ ref('int_f1db__drivers_with_countries') }}
)

select
    driver_id,
    driver_code,
    driver_number,
    first_name,
    last_name,
    driver_name,
    driver_full_name,
    gender,
    date_of_birth,
    date_of_death,
    place_of_birth,
    country_of_birth_country_id as country_of_birth_id,
    nationality_country_id,
    nationality,
    second_nationality_country_id,
    total_race_entries as entry_count,
    total_race_starts as start_count,
    total_race_entries as race_entry_count,
    total_sprint_race_starts as sprint_entry_count,
    total_race_starts as race_start_count,
    total_sprint_race_starts as sprint_start_count,
    total_race_wins as win_count,
    total_podiums as podium_count,
    total_fastest_laps as fastest_lap_count,
    total_race_entries as qualifying_entry_count,
    total_pole_positions as qualifying_p1_count,
    total_championship_wins as championship_count,
    total_points,
    (total_points * 100)::integer as total_points_x100,
    null::integer as first_race_id,
    null::text as first_race_name,
    null::date as first_race_date,
    null::integer as last_race_id,
    null::text as last_race_name,
    null::date as last_race_date,
    {{ var('refresh_id') }}::bigint as refresh_id
from drivers

