import { faker } from '@faker-js/faker';
import unitTestDb from '__tests__/unit/db';
import { getUser } from '__tests__/unit/db/helpers/getUser';
import { insertUser } from '__tests__/unit/db/helpers/insertUser';
import { ILoginRepository, ILoginService } from 'domain/login/interfaces';
import { LoginRepository } from 'domain/login/repository';
import { LoginService } from 'domain/login/service';
import { IUserQueries, IUserRepository } from 'domain/user/interfaces';
import { UserQueries } from 'domain/user/queries';
import { UserRepository } from 'domain/user/repository';
import jwtHandler from 'helpers/jwtHandler';
import { InvalidCredentialsError } from 'infra/exception/InvalidCredentialsError';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';

describe('LoginService', () => {
  let userQueries: IUserQueries;
  let loginRepository: ILoginRepository;
  let userRepository: IUserRepository;
  let service: ILoginService;

  beforeEach(() => {
    userQueries = new UserQueries(unitTestDb);
    loginRepository = new LoginRepository(userQueries);
    userRepository = new UserRepository(userQueries);
    service = new LoginService(loginRepository, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create token for successful login', async () => {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = await insertUser(data.username, data.password);

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
    const user = getUser();

    expect(
      service.login({ username: user.username, password: 'invalid' }),
    ).rejects.toThrowError(InvalidCredentialsError);
  });
});
