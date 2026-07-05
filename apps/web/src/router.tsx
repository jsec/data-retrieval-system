import { createRouter } from '@tanstack/react-router';

import { queryClient } from './lib/query/root-provider';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
    context: { queryClient },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
});

declare module '@tanstack/react-router' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        router: typeof router;
    }
}
