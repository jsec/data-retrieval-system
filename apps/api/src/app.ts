import Fastify from 'fastify';

const app = Fastify({
    logger: true,
});

app.get('/', (req, res) => {
    res.send({ status: 'up' });
});

export { app };
