import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import {
    getContext,
} from './lib/query/root-provider';
import { routeTree } from './routeTree.gen';

export const getRouter = () => {
    const context = getContext();

    const router = createTanStackRouter({
        context,
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
        routeTree,
        scrollRestoration: true,
    });

    return router;
};

declare module '@tanstack/react-router' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
