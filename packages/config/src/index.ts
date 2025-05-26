import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production'],
        default: 'development',
    }),
    STUFF: str({ default: 'stuff' }),
});

export const config = {
    env: {
        dev: env.isDev,
        prod: env.isProd,
        test: env.isTest,
    },
};

export type Config = typeof config;
