import type { CircuitSummary } from '@drs/shared/contract';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './data-table';
import { Card } from './ui/card';

type Props = {
    data: CircuitSummary[];
};

export const CircuitSummaryTable = ({ data }: Readonly<Props>) => {
    const columns: ColumnDef<CircuitSummary>[] = [
        {
            accessorKey: 'name',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('name')}
                </span>
            ),
            header: 'Circuit Name',
        },
        {
            accessorKey: 'country',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('country')}
                </span>
            ),
            header: 'Country',
        },
        {
            accessorKey: 'firstRace',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('firstRace')}
                </span>
            ),
            header: 'First Race',
        },
        {
            accessorKey: 'lastRace',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('lastRace')}
                </span>
            ),
            header: 'Last Race',
        },
    ];

    return (
        <div className="py-8 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Card className="mx-auto w-full max-w-275 py-0">
                    <DataTable columns={columns} data={data} />
                </Card>
            </div>
        </div>
    );
};
