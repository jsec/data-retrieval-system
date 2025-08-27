import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

let container: StartedPostgreSqlContainer;

export const setup = async () => {
    container = await new PostgreSqlContainer('ghcr.io/jsec/f1db').start();
};

export const teardown = async () => {
    await container.stop();
};
