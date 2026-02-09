import { httpInstrumentationMiddleware } from '@hono/otel';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

const telemetrySdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
});

const telemetryMiddleware = httpInstrumentationMiddleware({
    captureRequestHeaders: [
        'user-agent',
        'service-name',
    ],
    serviceName: 'drs-api',
    serviceVersion: '1.0.0',
});

export {
    telemetryMiddleware,
    telemetrySdk,
};
