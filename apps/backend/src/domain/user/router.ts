import {
  createExerciseSchema,
  createUserSchema,
  updateUserSchema,
} from './schemas';
import makeUserService from 'domain/factories/service/UserServiceFactory';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';
import { FastifyInstance } from 'fastify';
import { ICreateExercise, ICreateUser, IUpdateUser } from './interfaces';
import { authenticate } from 'hooks/authenticate';

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

      reply.status(201).send(response);
    },
  );
}

export async function privateUserRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authenticate);

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
      if (!req.user) {
        throw new UserNotFoundError();
      }

      const response = await service.update(req.user.id, req.body);

      reply.status(200).send(response);
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
      if (!req.user) {
        throw new UserNotFoundError();
      }

      const response = service.createExercise(req.user.id, req.body);
      reply.status(201).send(response);
    },
  );
}
