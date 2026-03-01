import { SeasonSummaryTable } from '@/components/SeasonSummaryTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seasons')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <SeasonSummaryTable />
    )
}
