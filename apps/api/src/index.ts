import { config } from '@drs/shared';
import { serve } from '@hono/node-server';

import { app } from './app.js';

serve({
    fetch: app.fetch,
    port: config.api.port,
}, () => {
    console.log(`Server is running on http://${config.api.hostname}:${config.api.port}`);
});
