import { comparePassword } from '../../../helpers/passwordHandler';
import prisma from '../../infra/prisma';
import { ILoginRepository, Login } from './interfaces';

export class LoginRepository implements ILoginRepository {
  public async checkLogin(data: Login): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
      select: {
        password: true,
      },
    });

    if (!user) {
      return false;
    }

    return comparePassword(data.password, user.password);
  }
}
