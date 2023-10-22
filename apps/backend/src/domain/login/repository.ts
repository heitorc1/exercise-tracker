import { ILoginRepository, ILogin } from './interfaces';
import { comparePassword } from 'helpers/passwordHandler';
import { IUserQueries } from 'domain/user/interfaces';

export class LoginRepository implements ILoginRepository {
  constructor(private readonly userQueries: IUserQueries) {}

  public async checkLogin(data: ILogin) {
    const user = this.userQueries.getByUsername(data.username);

    if (!user || !user.password) {
      return null;
    }

    const samePassword = await comparePassword(data.password, user.password);

    if (samePassword) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }

    return null;
  }
}
