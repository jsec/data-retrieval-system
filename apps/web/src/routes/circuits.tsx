import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { CircuitSummaryTable } from '@/components/circuit-summary-table';
import { orpc } from '@/rpc/client';

export const Route = createFileRoute('/circuits')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useQuery(orpc.circuits.summary.queryOptions({
        queryKey: ['circuits'],
    }));

    return (
        <div className="h-full w-full">
            <CircuitSummaryTable data={data ?? []} />
        </div>
    );
};
