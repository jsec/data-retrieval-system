import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TanStackQueryDevtools from './lib/query/devtools';
import { ThemeProvider } from './lib/theme';
import './styles.css';
import { getRouter } from './router';

const rootElement = document.querySelector('#app');

if (!rootElement) {
    throw new Error('Root element #app was not found.');
}

const router = getRouter();

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider>
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
        </ThemeProvider>
    </StrictMode>,
);
