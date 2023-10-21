import { IUserRepository } from 'domain/user/interfaces';
import { ILoginRepository, ILoginService, ILogin } from './interfaces';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';
import { InvalidCredentialsError } from 'infra/exception/InvalidCredentialsError';
import jwtHandler from 'helpers/jwtHandler';

export class LoginService implements ILoginService {
  constructor(
    private readonly loginRepository: ILoginRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async login(data: ILogin) {
    const userExists = this.userRepository.hasUsername(data.username);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const user = await this.loginRepository.checkLogin(data);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const token = jwtHandler.sign(user);

    return { data: token };
  }
}
