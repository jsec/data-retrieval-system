import type { ListSeasonsResponse } from '@drs/contracts';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { CountryFlag } from '#/components/country-flag';
import { DataTable } from '#/components/data-table';
import { TeamSquare } from '#/components/f1-ui';

type Props = {
    seasons: ListSeasonsResponse;
};

type Season = ListSeasonsResponse[number];

const ch = createColumnHelper<Season>();
const rowModel = getCoreRowModel<Season>();

const columns = [
    ch.accessor('season', {
        cell: info => (
            <span className="f1-num f1-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>
                {info.getValue()}
            </span>
        ),
        header: 'SEASON',
        meta: { width: '12%' },
    }),
    ch.accessor('raceCount', {
        cell: info => (
            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontWeight: 700 }}>
                {info.getValue()}
            </span>
        ),
        header: 'RACES',
        meta: { align: 'center', width: '10%' },
    }),
    ch.accessor('wdc', {
        cell: (info) => {
            const wdc = info.getValue();
            return (
                <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 10, minWidth: 0 }}>
                    <CountryFlag aria-hidden className="season-champion-flag" code={wdc.countryCode} />
                    <span className="f1-truncate" style={{ fontSize: 14, fontWeight: 600 }}>{wdc.name}</span>
                </div>
            );
        },
        header: 'WORLD CHAMPION',
        meta: { width: '39%' },
    }),
    ch.accessor('wcc', {
        cell: (info) => {
            const wcc = info.getValue();
            return wcc
                ? (
                        <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 10, minWidth: 0 }}>
                            <TeamSquare color={wcc.color} />
                            <span className="f1-truncate" style={{ fontSize: 14, fontWeight: 600 }}>{wcc.name}</span>
                        </div>
                    )
                : <span style={{ color: 'var(--color-muted-foreground)', fontSize: 13 }}>—</span>;
        },
        header: 'CONSTRUCTORS\' CHAMPION',
        meta: { width: '39%' },
    }),
];

const getSeasonLink = (s: Season) => {
    return {
        params: {
            year: String(s.season),
        },
        to: '/seasons/$year',
    } as const;
};

export const SeasonsTable = ({ seasons }: Props) => {
    const table = useReactTable({
        columns,
        data: seasons,
        getCoreRowModel: rowModel,
    });

    return (
        <DataTable rowLink={getSeasonLink} table={table} />
    );
};
