import type { QueryClient } from '@tanstack/react-query';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import ApplicationShell from '@/components/shell';
import { TanStackQueryDevtools } from '@/lib/devtools';

type MyRouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <ApplicationShell />
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
        </>
    ),
});
