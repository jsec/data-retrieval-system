import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constructors')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Placeholder for constructors</div>
}
