import { APP_KEY } from '../../infra/config';
import { InvalidCredentialsError } from '../../infra/exception/InvalidCredentialsError';
import { UserNotFoundError } from '../../infra/exception/UserNotFoundError';
import { IUserRepository } from '../user/interfaces';
import { ILoginRepository, ILoginService, Login } from './interfaces';
import * as jwt from 'jsonwebtoken';

export class LoginService implements ILoginService {
  constructor(
    private readonly loginRepository: ILoginRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async login(data: Login): Promise<{ data: string }> {
    const userExists = await this.userRepository.hasUsername(data.username);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const user = await this.loginRepository.checkLogin(data);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ data: user }, APP_KEY as jwt.Secret, {
      expiresIn: '4h',
    });

    return { data: token };
  }
}
