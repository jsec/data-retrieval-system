import type { ListConstructorsResponse } from '@drs/contracts';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { api } from '#/lib/query/api';

import type { Sort } from './-components/constructors-table';

import { ConstructorsTable, SORTS } from './-components/constructors-table';

const constructorsQuery = queryOptions({
    queryFn: () => api.get('constructors').json<ListConstructorsResponse>(),
    queryKey: ['constructors'],
});

const Constructors = () => {
    const { data } = useSuspenseQuery(constructorsQuery);
    return <ConstructorsTable constructors={data} />;
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
