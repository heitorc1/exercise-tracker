import { ILoginRepository, ILogin } from './interfaces';
import { comparePassword } from 'helpers/passwordHandler';
import { IUser } from 'domain/user/interfaces';
import type { Database } from 'better-sqlite3';

export class LoginRepository implements ILoginRepository {
  constructor(private readonly db: Database) {}

  public async checkLogin(data: ILogin) {
    const user = this.db
      .prepare(
        'SELECT id, username, email, password FROM users WHERE username = @username',
      )
      .get({ username: data.username }) as IUser;

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
