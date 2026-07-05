import type { FilterFn, SortingFn, SortingState } from '@tanstack/react-table';

import { CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useDeferredValue, useMemo, useState } from 'react';

import type { AllTimeDriver } from '#/data/types';

import { DataTable } from '#/components/data-table';
import { DriverAvatar, Pill, TrophyCount } from '#/components/f1-ui';
import { Card } from '#/components/ui/card';
import { Input, InputGroup } from '#/components/ui/input';
import { allTimeDriversQuery } from '#/data/queries';

type Category = 'active' | 'all' | 'champions';
type Sort = 'name' | 'poles' | 'starts' | 'titles' | 'wins';

const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'all', label: 'All drivers' },
    { key: 'champions', label: 'World Champions' },
    { key: 'active', label: 'Active' },
];

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'poles', label: 'Poles' },
    { key: 'starts', label: 'Starts' },
    { key: 'name', label: 'Name' },
];

const byTitles: SortingFn<AllTimeDriver> = (a, b) =>
    a.original.titles - b.original.titles || a.original.wins - b.original.wins;
const byWins: SortingFn<AllTimeDriver> = (a, b) =>
    a.original.wins - b.original.wins || a.original.podiums - b.original.podiums;

const fuzzy: FilterFn<AllTimeDriver> = (row, _columnId, value, addMeta) => {
    const ranked = rankItem(`${row.original.name} ${row.original.nat}`, value as string);
    addMeta({ itemRank: ranked });
    return ranked.passed;
};

const ch = createColumnHelper<AllTimeDriver>();
const coreRowModel = getCoreRowModel<AllTimeDriver>();
const filteredRowModel = getFilteredRowModel<AllTimeDriver>();
const sortedRowModel = getSortedRowModel<AllTimeDriver>();

function getDriverLink(d: AllTimeDriver) {
    return { params: { driverId: String(d.id) }, to: '/drivers/$driverId' } as const;
}

const columns = [
    ch.display({ header: '#', id: 'rank', meta: { ordinal: true, width: '4%' } }),
    ch.accessor('name', {
        cell: (info) => {
            const d = info.row.original;
            return (
                <div className="f1-control-group" style={{ gap: 11 }}>
                    <DriverAvatar code={d.code} color={d.color} />
                    <span className="f1-truncate" style={{ fontSize: 13.5, fontWeight: 600 }}>
                        {d.name}
                    </span>
                    <CaretRightIcon color="var(--neutral-400)" size={13} />
                </div>
            );
        },
        header: 'DRIVER',
        id: 'name',
        meta: { width: '45%' },
        sortingFn: 'text',
    }),
    ch.accessor('years', {
        cell: info => (
            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)', fontSize: 12.5 }}>
                {info.getValue()}
            </span>
        ),
        header: 'YEARS',
        meta: { width: '11%' },
    }),
    ch.accessor('starts', {
        cell: info => (
            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)' }}>{info.getValue()}</span>
        ),
        header: 'STARTS',
        meta: { align: 'center', width: '8%' },
    }),
    ch.accessor('wins', {
        cell: info => (
            <span className="f1-num f1-display" style={{ fontWeight: 700 }}>{info.getValue()}</span>
        ),
        header: 'WINS',
        id: 'wins',
        meta: { align: 'center', width: '7%' },
        sortingFn: byWins,
    }),
    ch.accessor('poles', {
        cell: info => (
            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)' }}>{info.getValue()}</span>
        ),
        header: 'POLES',
        meta: { align: 'center', width: '7%' },
    }),
    ch.accessor('podiums', {
        cell: info => (
            <span className="f1-num" style={{ color: 'var(--color-muted-foreground)' }}>{info.getValue()}</span>
        ),
        header: 'PODIUMS',
        meta: { align: 'center', width: '10%' },
    }),
    ch.accessor('titles', {
        cell: info => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TrophyCount count={info.getValue()} />
            </div>
        ),
        header: 'TITLES',
        id: 'titles',
        meta: { align: 'center', width: '8%' },
        sortingFn: byTitles,
    }),
];

const DriversIndex = () => {
    const { data: drivers } = useSuspenseQuery(allTimeDriversQuery());
    const { category = 'all', sort = 'titles' } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);

    const setCategory = (next: Category) =>
        void navigate({ search: prev => ({ ...prev, category: next }) });
    const setSort = (next: Sort) =>
        void navigate({ search: prev => ({ ...prev, sort: next }) });

    const data = useMemo(
        () =>
            drivers.filter(
                d =>
                    category === 'all'
                    || (category === 'champions' ? d.titles > 0 : d.active),
            ),
        [drivers, category],
    );

    const sorting: SortingState = useMemo(
        () => [{ desc: sort !== 'name', id: sort }],
        [sort],
    );

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: coreRowModel,
        getFilteredRowModel: filteredRowModel,
        getSortedRowModel: sortedRowModel,
        globalFilterFn: fuzzy,
        state: { globalFilter: deferredSearch, sorting },
    });

    const shown = table.getRowModel().rows.length;

    return (
        <div className="f1-page-stack">
            <div>
                <h1 className="f1-page-title">
                    Drivers
                </h1>
                <div className="f1-page-description">
                    {'All-time index · career statistics across every season · '}
                    <strong>{shown}</strong>
                    {` of ${drivers.length} shown`}
                </div>
            </div>

            <div className="f1-toolbar">
                <InputGroup>
                    <MagnifyingGlassIcon color="var(--color-muted-foreground)" data-icon="inline-start" size={15} />
                    <Input
                        onChange={e => setSearch(e.currentTarget.value)}
                        placeholder="Search name or nationality…"
                        value={search}
                    />
                </InputGroup>

                <div className="f1-control-group">
                    {CATEGORIES.map(c => (
                        <Pill active={category === c.key} key={c.key} onClick={() => setCategory(c.key)}>
                            {c.label}
                        </Pill>
                    ))}
                </div>

                <div className="f1-toolbar-spacer" />

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
                <DataTable rowLink={getDriverLink} table={table} />
            </Card>
        </div>
    );
};

export const Route = createFileRoute('/drivers/')({
    component: DriversIndex,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(allTimeDriversQuery());
        return { crumbs: [{ label: 'Drivers' }] };
    },
    validateSearch: (s: Record<string, unknown>): { category?: Category; sort?: Sort } => ({
        category: CATEGORIES.some(c => c.key === s.category) ? (s.category as Category) : undefined,
        sort: SORTS.some(so => so.key === s.sort) ? (s.sort as Sort) : undefined,
    }),
});
