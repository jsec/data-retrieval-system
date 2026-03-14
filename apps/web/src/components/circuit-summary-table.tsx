import type { CircuitSummary } from '@drs/shared/contract';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './data-table';

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
            filterFn: 'includesString',
            header: 'Circuit Name',
            size: 200,
        },
        {
            accessorKey: 'country',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('country')}
                </span>
            ),
            header: 'Country',
            size: 100,
        },
        {
            accessorKey: 'firstRace',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('firstRace')}
                </span>
            ),
            header: 'First Race',
            size: 50,
        },
        {
            accessorKey: 'lastRace',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('lastRace')}
                </span>
            ),
            header: 'Last Race',
            size: 50,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
};
