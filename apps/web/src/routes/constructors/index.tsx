import type { ListConstructorsResponse } from '@drs/contracts';
import type { SortingFn, SortingState } from '@tanstack/react-table';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '#/components/data-table';
import { Pill, TrophyCount } from '#/components/f1-ui';
import { Card } from '#/components/ui/card';
import { api } from '#/lib/query/api';

type Constructor = ListConstructorsResponse[number];
type Sort = 'podiums' | 'titles' | 'wins';

const constructorsQuery = queryOptions({
    queryFn: () => api.get('constructors').json<ListConstructorsResponse>(),
    queryKey: ['constructors'],
});

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'podiums', label: 'Podiums' },
];

const byTitles: SortingFn<Constructor> = (a, b) =>
    a.original.championships - b.original.championships || a.original.wins - b.original.wins;

const ch = createColumnHelper<Constructor>();
const coreRowModel = getCoreRowModel<Constructor>();
const sortedRowModel = getSortedRowModel<Constructor>();

const Constructors = () => {
    const { data } = useSuspenseQuery(constructorsQuery);
    const { sort = 'titles' } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const setSort = (next: Sort) =>
        void navigate({ search: () => ({ sort: next }) });

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
                        </div>
                    );
                },
                header: 'CONSTRUCTOR',
                meta: { width: '38%' },
            }),
            ch.accessor(
                row => ({
                    firstRaceDate: row.firstRaceDate,
                    lastRaceDate: row.lastRaceDate,
                }),
                {
                    cell: (info) => {
                        const { firstRaceDate, lastRaceDate } = info.getValue();

                        let years = '-';

                        if (firstRaceDate) {
                            const firstYear = Temporal.PlainDate.from(firstRaceDate).year;
                            const lastYear = lastRaceDate ? Temporal.PlainDate.from(lastRaceDate).year : '';

                            years = `${firstYear}-${lastYear}`;
                        }

                        return (
                            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontSize: 12.5 }}>
                                {years}
                            </span>
                        );
                    },
                    header: 'YEARS',
                    id: 'years',
                    meta: { width: '10%' },
                },
            ),
            ch.accessor('championships', {
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

    const sorting = useMemo<SortingState>(
        () => [{ desc: true, id: sort }],
        [sort],
    );

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: coreRowModel,
        getSortedRowModel: sortedRowModel,
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
};

export const Route = createFileRoute('/constructors/')({
    component: Constructors,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(constructorsQuery);
        return { crumbs: [{ label: 'Constructors' }] };
    },
    validateSearch: (s: Record<string, unknown>): { sort?: Sort } => ({
        sort: SORTS.some(so => so.key === s.sort) ? (s.sort as Sort) : undefined,
    }),
});
