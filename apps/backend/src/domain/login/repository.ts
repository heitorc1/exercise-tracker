import { ILoginRepository, Login } from './interfaces';
import { comparePassword } from 'helpers/passwordHandler';
import db from 'infra/db';
import { User } from 'domain/user/interfaces';

export class LoginRepository implements ILoginRepository {
  public async checkLogin(data: Login) {
    const user = db
      .prepare(
        'SELECT id, username, email, password FROM users WHERE username = @username',
      )
      .get({ username: data.username }) as User;

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
