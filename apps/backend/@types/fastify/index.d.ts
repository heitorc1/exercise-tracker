import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
