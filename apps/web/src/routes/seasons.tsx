import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seasons')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Placeholder for seasons</div>
}
