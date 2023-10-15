import { NextFunction, Request, Response } from 'express';
import { TokenNotFoundError } from '../exception/TokenNotFoundError';
import jwtHandler from '../../helpers/jwtHandler';
import { InvalidTokenError } from '../exception/InvalidTokenError';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new TokenNotFoundError();
  }

  const jwtToken = authorization.split(' ')[1];

  if (!jwtToken) {
    throw new InvalidTokenError();
  }

  const response = jwtHandler.verify(jwtToken);

  if (typeof response === 'string') {
    throw new InvalidTokenError();
  }

  req.user = response.data;

  next();
};
