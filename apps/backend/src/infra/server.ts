import build from './app';
import { APP_PORT } from './config';

const fastify = build({
  logger: true,
});

const start = async () => {
  try {
    fastify.listen({ port: APP_PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
