import type { MantineColorsTuple } from '@mantine/core';

import { createTheme, MantineProvider } from '@mantine/core';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TanStackQueryDevtools from './integrations/tanstack-query/devtools';
import { getRouter } from './router';
import './styles.css';

// F1 red brand ramp; index 6 is the exact accent (#e8002d) used across the design.
const f1red: MantineColorsTuple = [
    '#ffe8ec',
    '#ffd1d7',
    '#f6a1ab',
    '#f06d7d',
    '#eb4357',
    '#e8293f',
    '#e8002d',
    '#cf0028',
    '#b80022',
    '#a0001d',
];

const theme = createTheme({
    colors: { f1red },
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    headings: {
        fontWeight: '800',
        sizes: {
            h1: { fontSize: '30px', lineHeight: '1.1' },
            h3: { fontSize: '15px', fontWeight: '700', lineHeight: '1.2' },
        },
    },
    primaryColor: 'f1red',
});

const rootElement = document.querySelector('#app');

if (!rootElement) {
    throw new Error('Root element #app was not found.');
}

const router = getRouter();

createRoot(rootElement).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="light" theme={theme}>
            <QueryClientProvider client={router.options.context.queryClient}>
                <RouterProvider router={router} />
                <TanStackDevtools
                    config={{
                        position: 'bottom-right',
                    }}
                    plugins={[
                        {
                            name: 'Tanstack Router',
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
);
