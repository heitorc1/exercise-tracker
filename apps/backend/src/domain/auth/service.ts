import {
  IResponse,
  IToken,
  IUser,
  IUserRepository,
} from 'domain/user/interfaces';
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
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async login(data: ILogin) {
    const user = await this.userRepository.getByUsername(data.username);
    if (!user) {
      throw new UserNotFoundError();
    }

    const samePassword = await this.authRepository.checkLogin(
      data.password,
      user.password!,
    );

    if (!samePassword) {
      throw new InvalidCredentialsError();
    }

    const token = jwtHandler.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return { data: token };
  }

  public verifyToken(data: IVerifyToken): IResponse<IToken> {
    const decoded = jwtHandler.verify(data.token);

    if (typeof decoded === 'string') {
      throw new InvalidTokenError();
    }

    return {
      data: {
        ...(decoded.data as IUser),
        iat: decoded.iat,
        exp: decoded.exp,
      },
    };
  }
}
