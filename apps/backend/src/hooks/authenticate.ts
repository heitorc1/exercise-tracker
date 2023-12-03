/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtUserSchema } from '@exercise-tracker/shared/schemas/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import makeUserRepository from '@/domain/factories/repository/UserRepositoryFactory';
import { IJwtUser } from '@/domain/user/interfaces';
import jwtHandler from '@/helpers/jwtHandler';
import { InvalidTokenError } from '@/infra/exception/InvalidTokenError';
import { TokenNotFoundError } from '@/infra/exception/TokenNotFoundError';

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

  const user: IJwtUser = jwtUserSchema.parse(response.data);

  const repository = makeUserRepository();

  const validUser = repository.find(user.id);

  if (!validUser) {
    throw new InvalidTokenError();
  }

  req.user = user;

  done();
}
