import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { SeasonSummaryTable } from '@/components/season-summary-table';
import { orpc } from '@/rpc/client';

export const Route = createFileRoute('/seasons')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useQuery(orpc.seasons.summary.queryOptions({
        queryKey: ['seasonSummaries'],
    }));

    return (
        <div className="h-full w-full">
            <SeasonSummaryTable data={data ?? []} />
        </div>
    );
};
