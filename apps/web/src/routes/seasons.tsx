import type { SeasonSummaries } from '@drs/shared/types';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ky from 'ky';

import { SeasonSummaryTable } from '@/components/season-summary-table';

export const Route = createFileRoute('/seasons')({
    component: RouteComponent,
});

function RouteComponent() {
    const query = useQuery({
        queryFn: async () => {
            const response = await ky.get<SeasonSummaries>('/api/seasons/summary').json();
            return response;
        },
        queryKey: ['seasonSummaries'],
    });

    return (
        <div className="h-full w-full">
            <SeasonSummaryTable data={query.data ?? []} />
        </div>
    );
}
