import { InferContractRouterInputs, InferContractRouterOutputs } from '@orpc/contract';

import { circuitSummaryContract } from './circuits.contract.js';
import { driverSummaryContract } from './drivers.contract.js';
import { seasonSummaryContract } from './seasons.contract.js';

export const contract = {
    circuits: {
        summary: circuitSummaryContract,
    },
    drivers: {
        summary: driverSummaryContract,
    },
    seasons: {
        summary: seasonSummaryContract,
    },
};

export type Inputs = InferContractRouterInputs<typeof contract>;
export type Outputs = InferContractRouterOutputs<typeof contract>;

export { type ContractRouterClient } from '@orpc/contract';
