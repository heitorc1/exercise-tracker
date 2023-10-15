import { UserNotFoundError } from '../../infra/exception/UserNotFoundError';
import { IUserRepository } from '../user/interfaces';
import { ILoginRepository, ILoginService, Login } from './interfaces';

export class LoginService implements ILoginService {
  constructor(
    private readonly loginRepository: ILoginRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async login(data: Login): Promise<{ data: boolean }> {
    const userExists = await this.userRepository.hasUsername(data.username);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const response = await this.loginRepository.checkLogin(data);

    return { data: response };
  }
}
