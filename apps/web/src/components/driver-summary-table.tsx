import type { DriverSummary } from '@drs/shared/contract';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from './data-table';
import { Input } from './ui/input';

type Props = {
    data: DriverSummary[];
};

export const DriverSummaryTable = ({ data }: Readonly<Props>) => {
    const columns: ColumnDef<DriverSummary>[] = [
        {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            accessorKey: 'name',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('name')}
                </span>
            ),
            filterFn: 'includesString',
            header: 'Name',
            size: 200,
        },
        {
            accessorKey: 'nationality',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('nationality')}
                </span>
            ),
            header: 'Nationality',
            size: 100,
        },
        {
            accessorKey: 'firstGrandPrix',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('firstGrandPrix')}
                </span>
            ),
            header: 'First Grand Prix',
            size: 50,
        },
        {
            accessorKey: 'lastGrandPrix',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('lastGrandPrix')}
                </span>
            ),
            header: 'Last Grand Prix',
            size: 50,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            filters={table => (
                <Input
                    className="max-w-xs"
                    onChange={e => table.getColumn('name')?.setFilterValue(e.target.value)}
                    placeholder="Filter by circuit name..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                />
            )}
        />
    );
};
