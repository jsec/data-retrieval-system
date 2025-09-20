import '@mantine/core/styles.css';
import { createFileRoute } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <MantineProvider>
            <div className="text-center">
                Hi
            </div>
        </MantineProvider>
    )
}
