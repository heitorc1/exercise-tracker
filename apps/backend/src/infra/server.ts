import build from './app';

const fastify = build({
  logger: true,
});

const start = async () => {
  try {
    fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
