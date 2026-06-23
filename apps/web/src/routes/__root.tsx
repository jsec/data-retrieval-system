import type { QueryClient } from '@tanstack/react-query';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { TanStackDevtools } from '@tanstack/react-devtools';
import {
    createRootRouteWithContext,
    HeadContent,
    Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

type MyRouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        links: [
            {
                href: appCss,
                rel: 'stylesheet',
            },
        ],
        meta: [
            {
                charSet: 'utf8',
            },
            {
                content: 'width=device-width, initial-scale=1',
                name: 'viewport',
            },
            {
                title: 'Data Retrieval System',
            },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript defaultColorScheme="light" />
                <HeadContent />
            </head>
            <body>
                <MantineProvider defaultColorScheme="light">
                    {children}
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
                    <Scripts />
                </MantineProvider>
            </body>
        </html>
    );
}
