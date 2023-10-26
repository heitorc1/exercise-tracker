import { faker } from '@faker-js/faker';
import unitTestDb from '__tests__/unit/db';
import userHelper from '__tests__/unit/db/helpers/UserHelper';
import { IAuthRepository, IAuthService } from 'domain/auth/interfaces';
import { AuthRepository } from 'domain/auth/repository';
import { AuthService } from 'domain/auth/service';
import { IUserQueries, IUserRepository } from 'domain/user/interfaces';
import { UserQueries } from 'domain/user/queries';
import { UserRepository } from 'domain/user/repository';
import jwtHandler from 'helpers/jwtHandler';
import { InvalidCredentialsError } from 'infra/exception/InvalidCredentialsError';
import { InvalidTokenError } from 'infra/exception/InvalidTokenError';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';

describe('AuthService', () => {
  let userQueries: IUserQueries;
  let authRepository: IAuthRepository;
  let userRepository: IUserRepository;
  let service: IAuthService;

  beforeAll(() => {
    userQueries = new UserQueries(unitTestDb);
    authRepository = new AuthRepository(userQueries);
    userRepository = new UserRepository(userQueries);
    service = new AuthService(authRepository, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create token for successful login', async () => {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = await userHelper.insertUser(data.username, data.password);

    const response = await service.login(data);

    expect(response).toStrictEqual({
      data: jwtHandler.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    });
  });

  it('should not login with invalid user', () => {
    const data = {
      username: 'invalid-username',
      password: 'password',
    };

    expect(service.login(data)).rejects.toThrowError(UserNotFoundError);
  });

  it('should not login with invalid password', async () => {
    const user = userHelper.getUser();

    expect(
      service.login({ username: user.username, password: 'invalid' }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });

  it('should verify a correct token', () => {
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };

    jest.spyOn(jwtHandler, 'verify').mockReturnValue({ data: user });

    const response = service.verifyToken({ token: 'my-token' });

    expect(response.data).toStrictEqual(user);
  });

  it('should throw an error if incorrect token is provided', () => {
    jest.spyOn(jwtHandler, 'verify').mockReturnValue('incorrect-token');

    expect(() => service.verifyToken({ token: 'my-token' })).toThrowError(
      InvalidTokenError,
    );
  });
});
