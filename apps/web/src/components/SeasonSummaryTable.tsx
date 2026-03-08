import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table"

import { type SeasonSummary } from '@drs/shared/types';

type Props = {
    data: SeasonSummary[]
}

export const SeasonSummaryTable = ({ data }: Props) => {
    return (
        <div className='grid [&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-25'>Year</TableHead>
                        <TableHead>Driver's Champion</TableHead>
                        <TableHead>Constructor's Champion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(data => (
                        <TableRow key={data.year}>
                            <TableCell className='font-medium'>{data.year}</TableCell>
                            <TableCell>{data.wdc.name}</TableCell>
                            <TableCell>{data.wcc?.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
