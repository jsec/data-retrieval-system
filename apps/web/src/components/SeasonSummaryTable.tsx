import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table"

export const SeasonSummaryTable = () => {
    const data = [
        {
            year: 2024,
            numberOfRaces: 24,
            wdc: {
                id: 1,
                name: 'Max Verstappen'
            },
            wcc: {
                id: 2,
                name: 'McLaren'
            }
        },
        {
            year: 2020,
            numberOfRaces: 17,
            wdc: {
                id: 1,
                name: 'Lewis Hamilton'
            },
            wcc: {
                id: 5,
                name: 'Mercedes'
            }
        }
    ]

    return (
        <div className='grid [&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-25'>Year</TableHead>
                        <TableHead># of Races</TableHead>
                        <TableHead>Driver's Champion</TableHead>
                        <TableHead>Constructor's Champion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(data => (
                        <TableRow key={data.year}>
                            <TableCell className='font-medium'>{data.year}</TableCell>
                            <TableCell>{data.numberOfRaces}</TableCell>
                            <TableCell>{data.wdc.name}</TableCell>
                            <TableCell>{data.wcc.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
