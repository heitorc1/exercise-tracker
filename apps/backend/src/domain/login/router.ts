import { loginSchema } from './schemas';
import makeLoginService from 'domain/factories/service/LoginServiceFactory';
import { FastifyInstance } from 'fastify';
import { ILogin } from './interfaces';

const service = makeLoginService();

async function loginRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ILogin }>(
    '/',
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
}

export default loginRoutes;
