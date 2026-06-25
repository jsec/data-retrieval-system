with drivers as (
    select * from {{ ref('stg_f1db__driver') }}
),

nationality_countries as (
    select * from {{ ref('stg_f1db__country') }}
),

birth_countries as (
    select * from {{ ref('stg_f1db__country') }}
),

second_nationality_countries as (
    select * from {{ ref('stg_f1db__country') }}
)

select
    drivers.*,
    nationality_countries.country_name as nationality,
    birth_countries.country_name as country_of_birth,
    second_nationality_countries.country_name as second_nationality
from drivers
join nationality_countries
    on drivers.nationality_country_id = nationality_countries.country_id
join birth_countries
    on drivers.country_of_birth_country_id = birth_countries.country_id
left join second_nationality_countries
    on drivers.second_nationality_country_id = second_nationality_countries.country_id
