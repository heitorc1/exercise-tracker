import { loginSchema, verifySchema } from './schemas';
import { FastifyInstance } from 'fastify';
import { ILogin, IVerifyToken } from './interfaces';
import makeAuthService from 'domain/factories/service/AuthServiceFactory';

const service = makeAuthService();

async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ILogin }>(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    async (req, reply) => {
      const response = await service.login(req.body);

      return reply.status(200).send(response);
    },
  );

  fastify.post<{ Body: IVerifyToken }>(
    '/verify',
    {
      schema: {
        body: verifySchema,
      },
    },
    (req, reply) => {
      const response = service.verifyToken(req.body);

      return reply.status(200).send(response);
    },
  );
}

export default authRoutes;
