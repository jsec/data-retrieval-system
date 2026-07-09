import type { ListSeasonsResponse } from '@drs/contracts';

import { createColumnHelper, getCoreRowModel } from '@tanstack/react-table';

import { CountryFlag } from '#/components/country-flag';
import { TeamSquare } from '#/components/f1-ui';

export type Season = ListSeasonsResponse[number];

const ch = createColumnHelper<Season>();
export const rowModel = getCoreRowModel<Season>();

export const columns = [
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
