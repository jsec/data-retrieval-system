import type {
    ContractRouterClient,
    InferContractRouterInputs,
    InferContractRouterOutputs,
} from '@orpc/contract';
import { contract } from '@hub/contract';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

export type RpcClientInputs = InferContractRouterInputs<typeof contract>;
export type RpcClientOutputs = InferContractRouterOutputs<typeof contract>;

export const rpcClient: ContractRouterClient<typeof contract> = createORPCClient(
    new RPCLink({
        url: `${import.meta.VITE_API_URL}/api`
    })
);

export const rpc = createTanstackQueryUtils(rpcClient, {
    path: ['__api__']
});
