import { serve } from '@hono/node-server';

import { app } from './app.js';

const server = serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

process.on('SIGINT', () => {
    server.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    server.close((error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        process.exit(0);
    });
});
