import build from './app';
import { APP_HOST, APP_PORT } from './config';
import { pool } from './db';

const fastify = build({
  logger: true,
});

const start = async () => {
  try {
    fastify.listen({ host: APP_HOST, port: APP_PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await pool.end();
  console.log('**** shutting down ****');
  process.exit(0);
});

start();
