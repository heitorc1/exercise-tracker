/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';

export function invalidUser(
  req: FastifyRequest,
  reply: FastifyReply,
  done: any,
) {
  if (!req.user) {
    throw new UserNotFoundError();
  }

  done();
}
