import type { CircuitSummary } from '@drs/shared/types';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ky from 'ky';

import { CircuitTable } from '@/components/circuit-table';

export const Route = createFileRoute('/circuits')({
    component: RouteComponent,
});

function RouteComponent() {
    const query = useQuery({
        queryFn: async () => {
            const response = await ky.get<CircuitSummary[]>('/api/circuits').json();
            return response;
        },
        queryKey: ['circuits'],
    });

    return (
        <div className="h-full w-full">
            <CircuitTable data={query.data ?? []} />
        </div>
    );
}
