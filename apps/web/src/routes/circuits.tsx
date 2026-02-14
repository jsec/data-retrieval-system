import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/circuits')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Placeholder for circuits</div>
}
