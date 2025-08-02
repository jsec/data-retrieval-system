import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    NODE_ENV: str({
        choices: ['development', 'test', 'production'],
        default: 'development',
    }),
});

export const config = {
    databaseUrl: env.DATABASE_URL,
    env: {
        dev: env.isDev,
        prod: env.isProd,
        test: env.isTest,
    },
};

export type Config = typeof config;
