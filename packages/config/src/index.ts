import { cleanEnv, host, port, str } from 'envalid';

const env = cleanEnv(process.env, {
    API_HOST: host(),
    API_PORT: port(),
    DATABASE_URL: str(),
    NODE_ENV: str({
        choices: ['development', 'test', 'production'],
        default: 'development',
    }),
});

export const config = {
    api: {
        hostname: env.API_HOST,
        port: env.API_PORT,
    },
    databaseUrl: env.DATABASE_URL,
    env: {
        dev: env.isDev,
        prod: env.isProd,
        test: env.isTest,
    },
};

export type Config = typeof config;
