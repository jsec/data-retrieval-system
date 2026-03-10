import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table"
import { type CircuitSummary } from '@drs/shared/types';

type Props = {
    data: CircuitSummary[]
}

export const CircuitTable = ({ data }: Props) => {
    return (
        <div className='grid h-full [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-25'>Circuit</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>First Race</TableHead>
                        <TableHead>Last Race</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(data => (
                        <TableRow key={data.circuitId}>
                            <TableCell className='font-medium'>{data.name}</TableCell>
                            <TableCell>{data.country}</TableCell>
                            <TableCell>{data.firstRace}</TableCell>
                            <TableCell>{data.lastRace}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
