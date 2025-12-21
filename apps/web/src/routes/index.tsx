import { createFileRoute } from '@tanstack/react-router'
import DashboardShell from '@/components/Shell'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <DashboardShell />
    )
}
