import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drivers')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Placeholder for drivers</div>
}
