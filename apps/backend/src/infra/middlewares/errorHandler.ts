import { Request, Response } from 'express';
import { ZodError } from 'zod';
import * as jwt from 'jsonwebtoken';
import { logger } from 'infra/server';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  _: Request,
  response: Response,
) => {
  const statusCode = error?.statusCode || 500;

  if (error instanceof jwt.TokenExpiredError) {
    return response.status(401).json(error);
  }

  if (error instanceof ZodError) {
    return response.status(400).json({ errors: error.issues });
  }

  if (error?.toJSON) {
    return response.status(statusCode).json(error.toJSON());
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
    return response.status(statusCode).json(outputError);
  }

  logger.error('> Error: ', error);

  return response.status(statusCode).json(outputError);
};
