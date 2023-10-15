import { ILoginRepository, ILoginService } from 'domain/login/interfaces';
import { LoginRepository } from 'domain/login/repository';
import { LoginService } from 'domain/login/service';
import { IUserRepository } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import jwtHandler from 'helpers/jwtHandler';
import { InvalidCredentialsError } from 'infra/exception/InvalidCredentialsError';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';

describe('LoginService', () => {
  let loginRepository: ILoginRepository;
  let userRepository: IUserRepository;
  let service: ILoginService;

  beforeEach(() => {
    loginRepository = new LoginRepository();
    userRepository = new UserRepository();
    service = new LoginService(loginRepository, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create token for successful login', async () => {
    const data = {
      username: 'heitorc1',
      password: 'password',
    };
    const user = {
      id: 'c834e0c8-588b-422c-ac1f-37504e5e0508',
      username: 'heitorc1',
      email: 'heitorcarneiro1@gmail.com',
    };

    jest.spyOn(UserRepository.prototype, 'hasUsername').mockResolvedValue(true);
    jest.spyOn(LoginRepository.prototype, 'checkLogin').mockResolvedValue(user);

    const response = await service.login(data);

    expect(response).toStrictEqual({
      data: jwtHandler.sign(user),
    });
  });

  it('should not login with invalid user', () => {
    const data = {
      username: 'heitorc',
      password: 'password',
    };

    jest
      .spyOn(UserRepository.prototype, 'hasUsername')
      .mockResolvedValue(false);

    expect(service.login(data)).rejects.toThrowError(UserNotFoundError);
  });

  it('should not login with invalid password', () => {
    const data = {
      username: 'heitorc',
      password: 'invalid',
    };

    jest.spyOn(UserRepository.prototype, 'hasUsername').mockResolvedValue(true);
    jest.spyOn(LoginRepository.prototype, 'checkLogin').mockResolvedValue(null);

    expect(service.login(data)).rejects.toThrowError(InvalidCredentialsError);
  });
});
