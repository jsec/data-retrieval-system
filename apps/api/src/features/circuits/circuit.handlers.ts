import { contract } from '@drs/shared/contract';
import { implement } from '@orpc/server';

import { getCircuits } from './circuits.repository.js';

const os = implement(contract);

export const circuitSummary = os.circuits.summary.handler(async () => {
    const response = await getCircuits();
    return response;
});
