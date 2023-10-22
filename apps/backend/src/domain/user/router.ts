import {
  createExerciseSchema,
  createUserSchema,
  updateUserSchema,
} from './schemas';
import makeUserService from 'domain/factories/service/UserServiceFactory';
import { FastifyInstance } from 'fastify';
import { ICreateExercise, ICreateUser, IUpdateUser } from './interfaces';
import { authenticate } from 'hooks/authenticate';
import { invalidUser } from 'hooks/invalidUser';

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
  fastify.addHook('preHandler', invalidUser);

  fastify.get('/', (req, reply) => {
    const response = service.list();
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

  fastify.post<{ Body: ICreateExercise }>(
    '/exercises',
    {
      schema: {
        body: createExerciseSchema,
      },
    },
    (req, reply) => {
      const response = service.createExercise(req.user.id, req.body);
      reply.status(201).send(response);
    },
  );
}
