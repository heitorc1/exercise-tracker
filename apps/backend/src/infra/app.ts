/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import Fastify, {
  FastifyBaseLogger,
  FastifyHttpOptions,
  FastifyReply,
  FastifyRequest,
  FastifySchemaCompiler,
} from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { ZodAny, ZodError } from 'zod';
import { privateUserRoutes, publicUserRoutes } from '@/domain/user/router';
import authRoutes from '@/domain/auth/router';
import { exerciseRoutes } from '@/domain/exercises/routes';

function build(options: FastifyHttpOptions<Server, FastifyBaseLogger>) {
  const fastify = Fastify(options);

  fastify.register(helmet);
  fastify.register(cors);

  fastify.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      success: true,
    });
  });

  const validatorCompiler: FastifySchemaCompiler<ZodAny> = ({ schema }) => {
    return (data): any => {
      try {
        return { value: schema.parse(data) };
      } catch (error) {
        return { error };
      }
    };
  };

  fastify.setValidatorCompiler(validatorCompiler);

  fastify.register(publicUserRoutes, { prefix: 'user' });
  fastify.register(privateUserRoutes, { prefix: 'user' });
  fastify.register(authRoutes, { prefix: 'auth' });
  fastify.register(exerciseRoutes, { prefix: 'exercise' });

  fastify.setErrorHandler(function (
    error: any,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const statusCode = error?.statusCode || 500;

    if (error instanceof jwt.TokenExpiredError) {
      return reply.status(401).send({ error: error.message });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({ errors: error.issues });
    }

    if (error?.toJSON) {
      return reply.status(statusCode).send(error.toJSON());
    }

    const outputError = {
      statusCode: 500,
      message: 'Erro no servidor',
      data: null,
      code: null,
    };

    if (error?.type === 'entity.parse.failed') {
      outputError.message = 'Corpo da request inválido';
      outputError.statusCode = 400;
      return reply.status(statusCode).send(outputError);
    }

    this.log.error('> Error: ', error);

    return reply.status(statusCode).send(outputError);
  });

  return fastify;
}

export default build;
