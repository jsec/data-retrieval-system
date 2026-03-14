import { contract, type ContractRouterClient } from '@drs/shared/contract';
import { createORPCClient, onError } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

const link = new RPCLink({
    headers: () => ({
        authorization: 'Bearer token',
    }),
    interceptors: [
        // TODO: better error handling
        onError((error) => {
            if (error instanceof DOMException && error.name === 'AbortError') return;
            console.error(error);
        }),
    ],
    url: 'http://127.0.0.1:3000/rpc',
});

const client: ContractRouterClient<typeof contract> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
