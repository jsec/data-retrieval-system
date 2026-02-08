import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const description = `
Historical race data and stuff. More on that later.

### Disclaimer

This project is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
`;

export const configureDocumentation = (app: OpenAPIHono) => {
    app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
    });

    app.doc('/spec', {
        info: {
            contact: {
                name: 'Support',
                url: 'https://github.com/jsec/data-retrieval-system',
            },
            description,
            license: {
                name: 'MIT',
                url: 'https://github.com/jsec/data-retrieval-system/blob/develop/LICENSE',
            },
            title: 'DRS API Specification',
            version: '1.0.0',
        },
        openapi: '3.0.0',
        security: [
            { bearerAuth: [] },
        ],
        servers: [
            {
                description: 'TBD server URL',
                // TODO: source the server URL from config
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            {
                description: 'Data relating to F1 seasons',
                name: 'Seasons',
            },
            {
                description: 'Data relating to F1 drivers',
                name: 'Drivers',
            },
            {
                description: 'Data relating to F1 constructors',
                name: 'Constructors',
            },
        ],
    });

    app.get('/docs', Scalar({
        agent: {
            disabled: true,
        },
        defaultHttpClient: {
            clientKey: 'fetch',
            targetKey: 'node',
        },
        hideTestRequestButton: true,
        pageTitle: 'DRS API Documentation',
        url: '/spec',
    }));
};
