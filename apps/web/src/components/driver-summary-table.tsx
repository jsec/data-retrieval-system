import type { Outputs } from '@drs/shared/contract';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';

type Props = {
    data: Outputs['drivers']['summary'];
};

export const DriverSummaryTable = ({ data }: Readonly<Props>) => {
    return (
        <div className="grid h-full [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">Name</TableHead>
                        <TableHead>Nationality</TableHead>
                        <TableHead>First Race</TableHead>
                        <TableHead>Last Race</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(data => (
                        <TableRow key={data.driverId}>
                            <TableCell className="font-medium">
                                {data.firstName}
                                {' '}
                                {data.lastName}
                            </TableCell>
                            <TableCell>{data.nationality}</TableCell>
                            <TableCell>{data.firstGrandPrix}</TableCell>
                            <TableCell>{data.lastGrandPrix}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
