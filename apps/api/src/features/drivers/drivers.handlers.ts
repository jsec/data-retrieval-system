import { contract } from '@drs/shared/contract';
import { implement } from '@orpc/server';

import { getDrivers } from './drivers.repository.js';

const os = implement(contract);

export const driverSummary = os.drivers.summary.handler(async () => {
    const response = await getDrivers();
    return response;
});
