import { FastifyInstance } from 'fastify';
import {
  loginSchema,
  verifySchema,
} from '@exercise-tracker/shared/schemas/auth';
import makeAuthService from '@/domain/factories/service/AuthServiceFactory';
import { ILogin, IVerifyToken } from './interfaces';

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
