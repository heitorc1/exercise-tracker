import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { APP_KEY } from '../config';
import { TokenNotFoundError } from '../exception/TokenNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { ExpiredTokenError } from '../exception/ExpiredTokenError';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new TokenNotFoundError();
    }

    const jwtToken = authorization.split(' ')[1];

    if (!jwtToken) {
      throw new InvalidTokenError();
    }

    const response = jwt.verify(jwtToken, APP_KEY as jwt.Secret);

    if (typeof response === 'string') {
      throw new InvalidTokenError();
    }

    req.user = response.data;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new ExpiredTokenError();
    }

    next(err);
  }
};
