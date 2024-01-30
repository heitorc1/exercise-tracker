import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createRequest, createResponse } from 'node-mocks-http';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '@/domain/user/repository';
import { TokenNotFoundError } from '@/infra/exception/TokenNotFoundError';
import { InvalidTokenError } from '@/infra/exception/InvalidTokenError';
import { Jwt } from '@/helpers/jwtHandler';
import { authenticate } from '@/hooks/authenticate';

describe('Authenticate', () => {
  it('should return success', async (t) => {
    const req = createRequest({
      headers: {
        authorization: 'Bearer jwt',
      },
    });
    const res = createResponse();
    const next = t.mock.fn();

    const user = {
      id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
      username: 'heitorc1',
      email: 'heitor@gmail.com',
    };

    t.mock.method(Jwt.prototype, 'verify').mock.mockImplementationOnce(() => ({
      data: user,
      exp: new Date().getTime() + 4 * 60 * 60,
    }));
    t.mock
      .method(UserRepository.prototype, 'find')
      .mock.mockImplementationOnce(() => user);

    authenticate(req, res, next);

    assert.deepStrictEqual(req.user, user);
  });

  it('should not proceed if authorization header does not exists', (t) => {
    const req = createRequest({
      headers: {},
    });
    const res = createResponse();
    const next = t.mock.fn();

    assert.deepEqual(req.headers.authorization, undefined);
    assert.throws(() => authenticate(req, res, next), TokenNotFoundError);
  });

  it('should not proceed if authorization header is invalid', (t) => {
    const req = createRequest({
      headers: {
        authorization: 'invalid',
      },
    });
    const res = createResponse();
    const next = t.mock.fn();

    assert.throws(() => authenticate(req, res, next), InvalidTokenError);
  });

  it('should not proceed if verify return a string', (t) => {
    const req = createRequest({
      headers: {
        authorization: 'Bearer jwt',
      },
    });
    const res = createResponse();
    const next = t.mock.fn();

    t.mock
      .method(Jwt.prototype, 'verify')
      .mock.mockImplementationOnce(() => 'mytoken');

    assert.throws(() => authenticate(req, res, next), InvalidTokenError);
  });

  it('should not proceed if token is expired', (t) => {
    const req = createRequest({
      headers: {
        authorization: 'Bearer jwt',
      },
    });
    const res = createResponse();
    const next = t.mock.fn();

    t.mock.method(Jwt.prototype, 'verify').mock.mockImplementationOnce(() => {
      throw new jwt.TokenExpiredError('error', new Date());
    });

    assert.throws(() => authenticate(req, res, next), jwt.TokenExpiredError);
  });
});
