import type { SortingState } from '@tanstack/react-table';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

import { DataTable, useDataTable } from '#/components/data-table';
import { Pill } from '#/components/f1-ui';
import { Card } from '#/components/ui/card';
import { Input, InputGroup } from '#/components/ui/input';
import { allTimeDriversQuery } from '#/data/queries';

import { columns, fuzzy } from './-columns';

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

const DriversIndex = () => {
    const { data: drivers } = useSuspenseQuery(allTimeDriversQuery());
    const { category = 'all', sort = 'titles' } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });

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

    const { search, setSearch, table } = useDataTable({ columns, data, filter: fuzzy, sorting });

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
                <DataTable table={table} />
            </Card>
        </div>
    );
};

export const Route = createFileRoute('/drivers/')({
    component: DriversIndex,
    validateSearch: (s: Record<string, unknown>): { category?: Category; sort?: Sort } => ({
        category: CATEGORIES.some(c => c.key === s.category) ? (s.category as Category) : undefined,
        sort: SORTS.some(so => so.key === s.sort) ? (s.sort as Sort) : undefined,
    }),
    // eslint-disable-next-line perfectionist/sort-objects -- keep TanStack Router's dependency order (validateSearch before loader)
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(allTimeDriversQuery());
        return { crumbs: [{ label: 'Drivers' }] };
    },
});
