import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { faker } from '@faker-js/faker';
import {
  IUserQueries,
  IUserRepository,
  IUserService,
} from '@/domain/user/interfaces';
import { UserRepository } from '@/domain/user/repository';
import { UserService } from '@/domain/user/service';
import { EmailAlreadyInUseError } from '@/infra/exception/EmailAlreadyInUseError';
import { UsernameTakenError } from '@/infra/exception/UsernameTakenError';
import { NothingToUpdateError } from '@/infra/exception/NothingToUpdateError';

describe('UserService', () => {
  let repository: IUserRepository;
  let service: IUserService;
  let userQueries: IUserQueries;

  beforeEach(() => {
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

  it('should list users', async (t) => {
    const users = [
      {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    t.mock
      .method(UserRepository.prototype, 'list')
      .mock.mockImplementationOnce(async () => users);

    const response = await service.list();
    assert(response.data?.length >= 1);
    assert.deepStrictEqual(Object.keys(response.data?.[0]), [
      'id',
      'username',
      'email',
      'createdAt',
      'updatedAt',
    ]);
  });

  it('should create a user', async (t) => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'create')
      .mock.mockImplementationOnce(async () => user);

    const response = await service.create(user);

    assert(Object.keys(response).some((key) => key === 'data'));
    assert.deepEqual(response.data.username, user.username);
    assert.deepEqual(response.data.email, user.email);
  });

  it('should not create a new user with a username in use', async (t) => {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => true);

    await assert.rejects(
      async () => await service.create(data),
      UsernameTakenError,
    );
  });

  it('should not create a new user with a email in use', async (t) => {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => true);

    await assert.rejects(
      async () => await service.create(data),
      EmailAlreadyInUseError,
    );
  });

  it('should update a valid user', async (t) => {
    const date = new Date();
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        id: user.id,
        username: updateData.username,
        email: updateData.email,
        updatedAt: date,
        createdAt: user.createdAt,
      }));

    const response = await service.update(user.id, updateData);

    assert.deepStrictEqual(response, {
      data: {
        id: user.id,
        username: updateData.username,
        email: updateData.email,
        createdAt: user.createdAt,
        updatedAt: date,
      },
    });
  });

  it('should update a user with only username', async (t) => {
    const date = new Date();
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateData = {
      username: faker.internet.userName(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        id: user.id,
        username: updateData.username,
        email: user.email,
        updatedAt: date,
        createdAt: user.createdAt,
      }));

    const response = await service.update(user.id, updateData);

    assert.deepStrictEqual(response, {
      data: {
        id: user.id,
        username: updateData.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: date,
      },
    });
  });

  it('should update a user with only email', async (t) => {
    const date = new Date();
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateData = {
      email: faker.internet.email(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        id: user.id,
        username: user.username,
        email: updateData.email,
        updatedAt: date,
        createdAt: user.createdAt,
      }));

    const response = await service.update(user.id, updateData);

    assert.deepStrictEqual(response, {
      data: {
        id: user.id,
        username: user.username,
        email: updateData.email,
        createdAt: user.createdAt,
        updatedAt: date,
      },
    });
  });

  it('should update a user with only password', async (t) => {
    const date = new Date();
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateData = {
      password: faker.internet.password(),
    };

    t.mock
      .method(UserRepository.prototype, 'hasUsername')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'hasEmail')
      .mock.mockImplementationOnce(async () => false);
    t.mock
      .method(UserRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        id: user.id,
        username: user.username,
        email: user.email,
        updatedAt: date,
        createdAt: user.createdAt,
      }));

    const response = await service.update(user.id, updateData);

    assert.deepStrictEqual(response, {
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: date,
      },
    });
  });

  it('should not update a user without any data', async () => {
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateData = {};

    await assert.rejects(
      async () => await service.update(user.id, updateData),
      NothingToUpdateError,
    );
  });

  it('should delete user', async (t) => {
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    t.mock
      .method(UserRepository.prototype, 'delete')
      .mock.mockImplementationOnce(async () => true);

    const response = await service.delete(user.id);
    assert.deepStrictEqual(response, { data: true });
  });
});
