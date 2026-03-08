import ky from 'ky';
import { SeasonSummaryTable } from '@/components/SeasonSummaryTable'
import type { SeasonSummaries } from '@drs/shared/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seasons')({
    component: RouteComponent,
})

function RouteComponent() {
    const query = useQuery({
        queryKey: ['seasonSummaries'],
        queryFn: async () => {
            const response = await ky.get<SeasonSummaries>('/api/seasons/summary').json()
            return response;
        }
    })

    return (
        <SeasonSummaryTable data={query.data ?? []} />
    )
}
