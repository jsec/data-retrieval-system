import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/races')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Placeholder for races</div>
}
