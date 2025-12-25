import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { onError } from '@orpc/server';
import { CORSPlugin } from '@orpc/server/plugins';

// TODO: replace stub object with actual router
export const rpcHandler = new OpenAPIHandler({}, {
    interceptors: [
        onError((error) => {
            console.error(error);
        }),
    ],
    plugins: [new CORSPlugin()],
});
