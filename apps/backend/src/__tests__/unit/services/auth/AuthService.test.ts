import { beforeEach, describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { faker } from '@faker-js/faker';
import { IAuthRepository, IAuthService } from '@/domain/auth/interfaces';
import { AuthRepository } from '@/domain/auth/repository';
import { AuthService } from '@/domain/auth/service';
import { IUserQueries, IUserRepository } from '@/domain/user/interfaces';
import { UserRepository } from '@/domain/user/repository';
import jwtHandler from '@/helpers/jwtHandler';
import { InvalidCredentialsError } from '@/infra/exception/InvalidCredentialsError';
import { InvalidTokenError } from '@/infra/exception/InvalidTokenError';
import { UserNotFoundError } from '@/infra/exception/UserNotFoundError';

describe('AuthService', () => {
  let userQueries: IUserQueries;
  let authRepository: IAuthRepository;
  let userRepository: IUserRepository;
  let service: IAuthService;

  beforeEach(() => {
    authRepository = new AuthRepository();
    userRepository = new UserRepository(userQueries);
    service = new AuthService(authRepository, userRepository);
  });

  it('should be defined', () => {
    assert(service instanceof AuthService);
  });

  it('should create token for successful login', async (t) => {
    t.mock.timers.enable();

    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const data = {
      username: user.username,
      password: user.password,
    };

    t.mock
      .method(UserRepository.prototype, 'getByUsername')
      .mock.mockImplementationOnce(async () => user);

    t.mock
      .method(AuthRepository.prototype, 'checkLogin')
      .mock.mockImplementationOnce(async () => true);

    const response = await service.login(data);

    assert.deepStrictEqual(response, {
      data: jwtHandler.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    });
  });

  it('should not login with invalid user', async (t) => {
    const data = {
      username: 'invalid-username',
      password: 'password',
    };

    t.mock
      .method(UserRepository.prototype, 'getByUsername')
      .mock.mockImplementationOnce(() => null);

    await assert.rejects(
      async () => await service.login(data),
      UserNotFoundError,
    );
  });

  it('should not login with invalid password', async (t) => {
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    t.mock
      .method(UserRepository.prototype, 'getByUsername')
      .mock.mockImplementationOnce(async () => user);
    t.mock
      .method(AuthRepository.prototype, 'checkLogin')
      .mock.mockImplementationOnce(async () => false);

    await assert.rejects(
      async () =>
        await service.login({ username: user.username, password: 'invalid' }),
      InvalidCredentialsError,
    );
  });

  it('should verify a correct token', (t) => {
    const date = Date.now();

    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };

    t.mock.method(jwtHandler, 'verify').mock.mockImplementationOnce(() => ({
      data: user,
      iat: date,
      exp: 4 * 60 * 60 + date,
    }));

    const response = service.verifyToken({ token: 'my-token' });

    assert.deepStrictEqual(response.data, {
      ...user,
      iat: date,
      exp: 4 * 60 * 60 + date,
    });
  });

  it('should throw an error if incorrect token is provided', (t) => {
    t.mock
      .method(jwtHandler, 'verify')
      .mock.mockImplementationOnce(() => 'incorrect-token');

    assert.throws(
      () => service.verifyToken({ token: 'my-token' }),
      InvalidTokenError,
    );
  });
});
