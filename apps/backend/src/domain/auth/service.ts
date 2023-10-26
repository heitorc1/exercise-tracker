import { IResponse, IUser, IUserRepository } from 'domain/user/interfaces';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';
import { InvalidCredentialsError } from 'infra/exception/InvalidCredentialsError';
import jwtHandler from 'helpers/jwtHandler';
import { InvalidTokenError } from 'infra/exception/InvalidTokenError';
import {
  IAuthRepository,
  IAuthService,
  ILogin,
  IVerifyToken,
} from './interfaces';

export class AuthService implements IAuthService {
  constructor(
    private readonly loginRepository: IAuthRepository,
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

  public verifyToken(data: IVerifyToken): IResponse<IUser> {
    const decoded = jwtHandler.verify(data.token);

    if (typeof decoded === 'string') {
      throw new InvalidTokenError();
    }

    return { data: decoded.data as IUser };
  }
}
