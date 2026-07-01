import type { ListSeasonsResponse } from '@drs/contracts';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card } from '#/components/ui/card';
import { api } from '#/lib/query/api';

import { SeasonsTable } from './-components/seasons-table';

export const Route = createFileRoute('/seasons/')({
    component: Seasons,
    loader: async () => {
        return { crumbs: [{ label: 'Seasons' }] };
    },
});

function Seasons() {
    const { data: seasons } = useSuspenseQuery(
        queryOptions({
            queryFn: () => api.get('seasons').json<ListSeasonsResponse>(),
            queryKey: ['seasons'],
        }),
    );

    return (
        <div className="f1-page-stack">
            <div>
                <h1 className="f1-page-title">Seasons</h1>
                <div className="f1-page-description">Browse championship seasons and their outcomes</div>
            </div>

            <Card className="f1-table-card">
                <SeasonsTable seasons={seasons} />
            </Card>
        </div>
    );
}
