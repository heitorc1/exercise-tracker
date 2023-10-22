import {
  createExerciseSchema,
  findExerciseSchema,
  updateExerciseSchema,
} from './schemas';
import { FastifyInstance } from 'fastify';
import { ICreateExercise, IFindExercise, IUpdateExercise } from './interfaces';
import { authenticate } from 'hooks/authenticate';
import makeExerciseService from 'domain/factories/service/ExerciseServiceFactory';

const service = makeExerciseService();

export async function exerciseRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authenticate);

  fastify.get('/', (req, reply) => {
    const response = service.list(req.user.id);
    reply.status(200).send(response);
  });

  fastify.get<{ Params: IFindExercise }>(
    '/:id',
    {
      schema: {
        params: findExerciseSchema,
      },
    },
    (req, reply) => {
      const response = service.find(req.params.id, req.user.id);
      reply.status(200).send(response);
    },
  );

  fastify.post<{ Body: ICreateExercise }>(
    '/',
    {
      schema: {
        body: createExerciseSchema,
      },
    },
    (req, reply) => {
      const response = service.create(req.user.id, req.body);
      reply.status(201).send(response);
    },
  );

  fastify.patch<{ Params: IFindExercise; Body: IUpdateExercise }>(
    '/:id',
    {
      schema: {
        params: findExerciseSchema,
        body: updateExerciseSchema,
      },
    },
    (req, reply) => {
      const response = service.update(req.params.id, req.user.id, req.body);
      reply.status(200).send(response);
    },
  );

  fastify.delete<{ Params: IFindExercise }>(
    '/:id',
    {
      schema: {
        params: findExerciseSchema,
      },
    },
    (req, reply) => {
      const response = service.delete(req.params.id, req.user.id);
      reply.status(200).send(response);
    },
  );
}
