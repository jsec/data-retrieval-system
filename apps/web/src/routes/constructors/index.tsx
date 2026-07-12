import type { ListConstructorsResponse } from '@drs/contracts';
import type { SortingState } from '@tanstack/react-table';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

import { DataTable, useDataTable } from '#/components/data-table';
import { Pill } from '#/components/f1-ui';
import { Card } from '#/components/ui/card';
import { api } from '#/lib/query/api';

import { makeConstructorColumns } from './-columns';

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

const Constructors = () => {
    const { data } = useSuspenseQuery(constructorsQuery);
    const { sort = 'titles' } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const setSort = (next: Sort) =>
        void navigate({ search: () => ({ sort: next }) });

    const maxWins = useMemo(() => Math.max(...data.map(c => c.wins)), [data]);
    const columns = useMemo(() => makeConstructorColumns(maxWins), [maxWins]);

    const sorting = useMemo<SortingState>(
        () => [{ desc: true, id: sort }],
        [sort],
    );

    const { table } = useDataTable({ columns, data, sorting });

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
    validateSearch: (s: Record<string, unknown>): { sort?: Sort } => ({
        sort: SORTS.some(so => so.key === s.sort) ? (s.sort as Sort) : undefined,
    }),
    // eslint-disable-next-line perfectionist/sort-objects -- keep TanStack Router's dependency order (validateSearch before loader)
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(constructorsQuery);
        return { crumbs: [{ label: 'Constructors' }] };
    },
});
