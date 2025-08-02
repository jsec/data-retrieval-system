import pino from 'pino';
import { pinoHttp } from 'pino-http';

const logger = pino();
const httpLogger = pinoHttp();

export { httpLogger, logger };
