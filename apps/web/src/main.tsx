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

const palette: MantineColorsTuple = [
    '#ffeae6',
    '#ffd4ce',
    '#ffa79b',
    '#ff7764',
    '#fe4e36',
    '#fe3519',
    '#ff1e00',
    '#e41800',
    '#cb1000',
    '#b20100',
];

const theme = createTheme({
    colors: { palette },
    primaryColor: 'palette',
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
