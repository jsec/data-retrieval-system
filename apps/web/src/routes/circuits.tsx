import { CircuitTable } from '@/components/CircuitTable';
import type { CircuitSummary } from '@drs/shared/types';
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ky from 'ky';

export const Route = createFileRoute('/circuits')({
    component: RouteComponent,
})

function RouteComponent() {
    const query = useQuery({
        queryKey: ['circuits'],
        queryFn: async () => {
            const response = await ky.get<CircuitSummary[]>('/api/circuits').json();
            return response;
        }
    })

    return (
        <div className='h-full w-full'>
            <CircuitTable data={query.data ?? []} />
        </div>
    )
}
