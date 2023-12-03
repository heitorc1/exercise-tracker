import { FastifyInstance } from 'fastify';
import {
  createExerciseSchema,
  findExerciseSchema,
  updateExerciseSchema,
} from '@exercise-tracker/shared/schemas/exercise';
import { authenticate } from '@/hooks/authenticate';
import makeExerciseService from '@/domain/factories/service/ExerciseServiceFactory';
import { ICreateExercise, IFindExercise, IUpdateExercise } from './interfaces';

const service = makeExerciseService();

export async function exerciseRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authenticate);

  fastify.get('/', async (req, reply) => {
    const response = await service.list(req.user.id);
    reply.status(200).send(response);
  });

  fastify.get<{ Params: IFindExercise }>(
    '/:id',
    {
      schema: {
        params: findExerciseSchema,
      },
    },
    async (req, reply) => {
      const response = await service.find(req.params.id, req.user.id);
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
    async (req, reply) => {
      const response = await service.create(req.user.id, req.body);
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
    async (req, reply) => {
      const response = await service.update(
        req.params.id,
        req.user.id,
        req.body,
      );
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
    async (req, reply) => {
      const response = await service.delete(req.params.id, req.user.id);
      reply.status(200).send(response);
    },
  );
}
