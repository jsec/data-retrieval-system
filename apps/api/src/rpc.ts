import { contract } from '@drs/shared/contract';
import { implement, onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { CORSPlugin } from '@orpc/server/plugins';

import { circuitSummary } from './features/circuits/circuit.handlers.js';
import { driverSummary } from './features/drivers/drivers.handlers.js';
import { seasonSummary } from './features/seasons/season.handlers.js';

const os = implement(contract);

export const router = os.router({
    circuits: {
        summary: circuitSummary,
    },
    drivers: {
        summary: driverSummary,
    },
    seasons: {
        summary: seasonSummary,
    },
});

export const handler = new RPCHandler(router, {
    interceptors: [
        onError((error) => {
            // TODO: Better error handling
            console.error(error);
        }),
    ],
    plugins: [new CORSPlugin()],
});
