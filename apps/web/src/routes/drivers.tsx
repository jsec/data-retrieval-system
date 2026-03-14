import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DriverSummaryTable } from '@/components/driver-summary-table';
import { orpc } from '@/rpc/client';

export const Route = createFileRoute('/drivers')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useQuery(orpc.drivers.summary.queryOptions({
        queryKey: ['driverSummary'],
    }));

    return (
        <div className="h-full w-full">
            <DriverSummaryTable data={data ?? []} />
        </div>
    );
};
