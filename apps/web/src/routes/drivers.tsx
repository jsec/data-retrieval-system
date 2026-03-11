import { DriverTable } from '@/components/DriverTable'
import type { DriverSummary } from '@drs/shared/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ky from 'ky'

export const Route = createFileRoute('/drivers')({
    component: RouteComponent,
})

function RouteComponent() {
    const query = useQuery({
        queryKey: ['drivers'],
        queryFn: async () => {
            const response = await ky.get<DriverSummary[]>('/api/drivers').json();
            return response;
        }
    })

    return (
        <div className='h-full w-full'>
            <DriverTable data={query.data ?? []} />
        </div>
    )
}
