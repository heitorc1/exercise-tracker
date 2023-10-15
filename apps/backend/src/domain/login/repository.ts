import { comparePassword } from '../../helpers/passwordHandler';
import prisma from '../../infra/prisma';
import { User } from '../user/interfaces';
import { ILoginRepository, Login } from './interfaces';

export class LoginRepository implements ILoginRepository {
  public async checkLogin(data: Login): Promise<Omit<User, 'password'> | null> {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
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
