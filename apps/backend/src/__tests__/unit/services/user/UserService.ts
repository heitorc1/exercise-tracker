import unitTestDb from '__tests__/unit/db';
import { IUserRepository, IUserService } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import { UserService } from 'domain/user/service';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';
import { UsernameTakenError } from 'infra/exception/UsernameTakenError';
import { faker } from '@faker-js/faker';
import { comparePassword } from 'helpers/passwordHandler';
import { getUser } from '__tests__/unit/db/helpers/getUser';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';

describe('UserService', () => {
  let repository: IUserRepository;
  let service: IUserService;

  beforeEach(() => {
    repository = new UserRepository(unitTestDb);
    service = new UserService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list users', async () => {
    const response = await service.list();

    expect(response.data?.length).toBeGreaterThan(1);
    expect(response.data?.[0]).toHaveProperty('id');
    expect(response.data?.[0]).toHaveProperty('username');
    expect(response.data?.[0]).toHaveProperty('email');
    expect(response.data?.[0]).toHaveProperty('createdAt');
    expect(response.data?.[0]).toHaveProperty('updatedAt');
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

    expect(response).toHaveProperty('data');
    expect(response.data.username).toBe(user.username);
    expect(isSamePassword).toBe(true);
    expect(response.data.email).toBe(user.email);
  });

  it('should not create a new user with a username in use', async () => {
    const user = await getUser();
    const data = {
      username: user.username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(service.create(data)).rejects.toThrowError(UsernameTakenError);
  });

  it('should not create a new user with a email in use', async () => {
    const user = await getUser();
    const data = {
      username: faker.internet.userName(),
      email: user.email,
      password: faker.internet.password(),
    };

    expect(service.create(data)).rejects.toThrowError(EmailAlreadyInUseError);
  });

  it('should update a valid user', async () => {
    const existingUser = await getUser();
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    const response = await service.update(existingUser.id, user);

    expect(response).toMatchObject({
      data: {
        id: existingUser.id,
        username: user.username,
        email: user.email,
        createdAt: existingUser.createdAt,
        updatedAt: date.toISOString(),
      },
    });
  });

  it('should update a user with only username', async () => {
    const existingUser = await getUser();
    const user = {
      username: faker.internet.userName(),
    };

    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    const response = await service.update(existingUser.id, user);

    expect(response).toMatchObject({
      data: {
        id: existingUser.id,
        username: user.username,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: date.toISOString(),
      },
    });
  });

  it('should update a user with only email', async () => {
    const existingUser = await getUser();
    const user = {
      email: faker.internet.email(),
    };

    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    const response = await service.update(existingUser.id, user);

    expect(response).toMatchObject({
      data: {
        id: existingUser.id,
        username: existingUser.username,
        email: user.email,
        createdAt: existingUser.createdAt,
        updatedAt: date.toISOString(),
      },
    });
  });

  it('should update a user with only password', async () => {
    const existingUser = await getUser();
    const user = {
      password: faker.internet.password(),
    };

    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    const response = await service.update(existingUser.id, user);

    expect(response).toMatchObject({
      data: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: date.toISOString(),
      },
    });
  });

  it('should not update a user without any data', async () => {
    const existingUser = await getUser();
    const user = {};

    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    expect(service.update(existingUser.id, user)).rejects.toThrowError(
      NothingToUpdateError,
    );
  });
});
