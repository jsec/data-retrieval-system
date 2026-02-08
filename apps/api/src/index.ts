import { serve } from '@hono/node-server';

import { app } from './app.js';

// TODO: set port and hostname in config
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
