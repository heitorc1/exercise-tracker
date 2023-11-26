import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { faker } from '@faker-js/faker';
import unitTestDb from '__tests__/unit/db';
import {
  IUserQueries,
  IUserRepository,
  IUserService,
} from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import { UserService } from 'domain/user/service';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';
import { UsernameTakenError } from 'infra/exception/UsernameTakenError';
import { comparePassword } from 'helpers/passwordHandler';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';
import { UserQueries } from 'domain/user/queries';
import userHelper from '__tests__/unit/db/helpers/UserHelper';

describe('UserService', () => {
  let repository: IUserRepository;
  let service: IUserService;
  let userQueries: IUserQueries;

  beforeEach(() => {
    userQueries = new UserQueries(unitTestDb);
    repository = new UserRepository(userQueries);
    service = new UserService(repository);
    const date = new Date('2023-10-18');
    mock.timers.enable({ apis: ['Date'], now: date });
  });

  afterEach(() => {
    mock.timers.reset();
  });

  it('should be defined', () => {
    assert(service instanceof UserService);
  });

  it('should list users', () => {
    const response = service.list();

    assert(response.data?.length > 1);
    assert.deepStrictEqual(Object.keys(response.data?.[0]), [
      'id',
      'username',
      'email',
      'createdAt',
      'updatedAt',
    ]);
  });

  it('should create a user', async () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    const response = await service.create(user);
    const isSamePassword = await comparePassword(
      user.password,
      response.data.password!,
    );

    assert(Object.keys(response).some((key) => key === 'data'));
    assert.deepEqual(response.data.username, user.username);
    assert.deepEqual(response.data.email, user.email);
    assert.deepEqual(isSamePassword, true);
  });

  it('should not create a new user with a username in use', async () => {
    const user = userHelper.getUser();
    const data = {
      username: user.username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await assert.rejects(
      async () => await service.create(data),
      UsernameTakenError,
    );
  });

  it('should not create a new user with a email in use', async () => {
    const user = userHelper.getUser();
    const data = {
      username: faker.internet.userName(),
      email: user.email,
      password: faker.internet.password(),
    };

    await assert.rejects(
      async () => await service.create(data),
      EmailAlreadyInUseError,
    );
  });

  it('should update a valid user', async () => {
    const existingUser = userHelper.getUser();
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    const response = await service.update(existingUser.id, user);

    assert.deepStrictEqual(response, {
      data: {
        id: existingUser.id,
        username: user.username,
        email: user.email,
        createdAt: existingUser.createdAt,
        updatedAt: new Date().toISOString(),
      },
    });
  });

  it('should update a user with only username', async () => {
    const existingUser = userHelper.getUser();
    const user = {
      username: faker.internet.userName(),
    };

    const response = await service.update(existingUser.id, user);

    assert.deepStrictEqual(response, {
      data: {
        id: existingUser.id,
        username: user.username,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: new Date().toISOString(),
      },
    });
  });

  it('should update a user with only email', async () => {
    const existingUser = userHelper.getUser();
    const user = {
      email: faker.internet.email(),
    };

    const response = await service.update(existingUser.id, user);

    assert.deepStrictEqual(response, {
      data: {
        id: existingUser.id,
        username: existingUser.username,
        email: user.email,
        createdAt: existingUser.createdAt,
        updatedAt: new Date().toISOString(),
      },
    });
  });

  it('should update a user with only password', async () => {
    const existingUser = userHelper.getUser();
    const user = {
      password: faker.internet.password(),
    };

    const response = await service.update(existingUser.id, user);

    assert.deepStrictEqual(response, {
      data: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: new Date().toISOString(),
      },
    });
  });

  it('should not update a user without any data', async () => {
    const existingUser = userHelper.getUser();
    const user = {};

    await assert.rejects(
      async () => await service.update(existingUser.id, user),
      NothingToUpdateError,
    );
  });

  it('should delete user', () => {
    const existingUser = userHelper.getUser();

    const response = service.delete(existingUser.id);
    assert.deepStrictEqual(response, { data: true });
  });
});
