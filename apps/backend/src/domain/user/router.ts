import { FastifyInstance } from 'fastify';
import {
  createUserSchema,
  updateUserSchema,
} from '@exercise-tracker/shared/schemas/user';
import makeUserService from '@/domain/factories/service/UserServiceFactory';
import { authenticate } from '@/hooks/authenticate';
import { ICreateUser, IUpdateUser } from './interfaces';

const service = makeUserService();

export async function publicUserRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ICreateUser }>(
    '/',
    {
      schema: {
        body: createUserSchema,
      },
    },
    async (req, reply) => {
      const response = await service.create(req.body);

      return reply.status(201).send(response);
    },
  );
}

export async function privateUserRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authenticate);

  fastify.get('/', async (req, reply) => {
    const response = await service.list();
    reply.send(response);
  });

  fastify.patch<{ Body: IUpdateUser }>(
    '/',
    {
      schema: {
        body: updateUserSchema,
      },
    },
    async (req, reply) => {
      const response = await service.update(req.user.id, req.body);
      return reply.status(200).send(response);
    },
  );

  fastify.delete('/', async (req, reply) => {
    const response = await service.delete(req.user.id);
    reply.status(200).send(response);
  });
}
