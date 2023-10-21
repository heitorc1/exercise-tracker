/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';
import jwtHandler from 'helpers/jwtHandler';
import { InvalidTokenError } from 'infra/exception/InvalidTokenError';
import { TokenNotFoundError } from 'infra/exception/TokenNotFoundError';

export function authenticate(
  req: FastifyRequest,
  reply: FastifyReply,
  done: any,
) {
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

  done();
}
