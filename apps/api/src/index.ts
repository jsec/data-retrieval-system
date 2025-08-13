import { app } from './app.js';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
app.listen({ port: 3333 }), (err: never, address: never) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    app.log.info(`Server is now listening on ${address}`);
};
