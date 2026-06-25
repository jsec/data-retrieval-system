with races as (
    select * from {{ ref('stg_f1db__race') }}
),

circuits as (
    select * from {{ ref('int_f1db__circuits_with_countries') }}
)

select
    races.*,
    circuits.circuit_name,
    circuits.circuit_full_name,
    circuits.country_id as circuit_country_id,
    circuits.country as circuit_country,
    circuits.place_name as circuit_location,
    circuits.latitude as circuit_latitude,
    circuits.longitude as circuit_longitude
from races
join circuits
    on races.circuit_id = circuits.circuit_id
