import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';

import { configureDocumentation } from './docs/index.js';
import { telemetryMiddleware, telemetrySdk } from './lib/telemetry.js';
import { router as seasonsRouter } from './seasons/router.js';

const app = new OpenAPIHono();

telemetrySdk.start();

app.use(telemetryMiddleware);
app.use(logger());

app.route('/seasons', seasonsRouter);

configureDocumentation(app);

export { app };
