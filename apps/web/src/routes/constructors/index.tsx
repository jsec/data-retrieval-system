import type { SortingFn, SortingState } from '@tanstack/react-table';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import type { AllTimeConstructor } from '#/data/types';

import { DataTable } from '#/components/data-table';
import { Pill, TrophyCount } from '#/components/f1-ui';
import { Badge } from '#/components/ui/badge';
import { Card } from '#/components/ui/card';
import { constructorsIndexQuery } from '#/data/queries';

export const Route = createFileRoute('/constructors/')({
    component: Constructors,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(constructorsIndexQuery());
        return { crumbs: [{ label: 'Constructors' }] };
    },
});

type Sort = 'podiums' | 'poles' | 'titles' | 'wins';

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'poles', label: 'Poles' },
    { key: 'podiums', label: 'Podiums' },
];

const byTitles: SortingFn<AllTimeConstructor> = (a, b) =>
    a.original.titles - b.original.titles || a.original.wins - b.original.wins;

const ch = createColumnHelper<AllTimeConstructor>();

function Constructors() {
    const { data } = useSuspenseQuery(constructorsIndexQuery());
    const [sort, setSort] = useState<Sort>('titles');

    const maxWins = useMemo(() => Math.max(...data.map(c => c.wins)), [data]);

    const columns = useMemo(
        () => [
            ch.display({ header: '#', id: 'rank', meta: { ordinal: true, width: '4%' } }),
            ch.accessor('name', {
                cell: (info) => {
                    const c = info.row.original;
                    return (
                        <div className="f1-control-group" style={{ gap: 11 }}>
                            <div style={{ background: c.color, borderRadius: 3, flexShrink: 0, height: 26, width: 6 }} />
                            <span className="f1-truncate" style={{ fontSize: 14, fontWeight: 700 }}>
                                {c.name}
                            </span>
                            {c.active
                                ? <Badge variant="success">ACTIVE</Badge>
                                : null}
                        </div>
                    );
                },
                header: 'CONSTRUCTOR',
                meta: { width: '38%' },
            }),
            ch.accessor('years', {
                cell: info => (
                    <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontSize: 12.5 }}>
                        {info.getValue()}
                    </span>
                ),
                header: 'YEARS',
                meta: { width: '10%' },
            }),
            ch.accessor('titles', {
                cell: info => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <TrophyCount count={info.getValue()} size={12} />
                    </div>
                ),
                header: 'TITLES',
                id: 'titles',
                meta: { align: 'center', width: '9%' },
                sortingFn: byTitles,
            }),
            ch.accessor('wins', {
                cell: info => (
                    <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap', gap: 10 }}>
                        <span className="f1-num f1-display" style={{ fontSize: 13.5, fontWeight: 700, width: 34 }}>
                            {info.getValue()}
                        </span>
                        <div style={{ background: 'var(--color-border)', borderRadius: 9999, flex: 1, height: 6, maxWidth: 150, overflow: 'hidden' }}>
                            <div style={{ background: info.row.original.color, borderRadius: 9999, height: '100%', width: `${(info.getValue() / maxWins) * 100}%` }} />
                        </div>
                    </div>
                ),
                header: 'WINS',
                id: 'wins',
                meta: { width: '23%' },
            }),
            ch.accessor('poles', {
                cell: info => (
                    <span className="f1-num" style={{ color: 'var(--color-muted-foreground)' }}>
                        {info.getValue()}
                    </span>
                ),
                header: 'POLES',
                meta: { align: 'center', width: '8%' },
            }),
            ch.accessor('podiums', {
                cell: info => (
                    <span className="f1-num" style={{ color: 'var(--color-muted-foreground)' }}>
                        {info.getValue()}
                    </span>
                ),
                header: 'PODIUMS',
                meta: { align: 'center', width: '8%' },
            }),
        ],
        [maxWins],
    );

    const sorting: SortingState = [{ desc: true, id: sort }];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
    });

    return (
        <div className="f1-page-stack">
            <div className="f1-page-header">
                <div>
                    <h1 className="f1-page-title">
                        Constructors
                    </h1>
                    <div className="f1-page-description">
                        All-time index · Constructors&apos; Championships and records since 1958
                    </div>
                </div>
                <div className="f1-control-group">
                    <span className="f1-sort-label">SORT</span>
                    {SORTS.map(s => (
                        <Pill active={sort === s.key} key={s.key} onClick={() => setSort(s.key)} variant="subtle">
                            {s.label}
                        </Pill>
                    ))}
                </div>
            </div>

            <Card className="f1-table-card">
                <DataTable px={20} table={table} />
            </Card>
        </div>
    );
}
