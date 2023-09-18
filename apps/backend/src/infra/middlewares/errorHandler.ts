import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: any,
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = error?.statusCode || 500;
  if (error instanceof ZodError) {
    const errors: Array<unknown> = error.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return response.status(400).json({ errors });
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

  console.error('> Error: ', error);

  return response.status(statusCode).json(outputError);
};
