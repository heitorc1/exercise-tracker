import { comparePassword } from '@/helpers/passwordHandler';
import { IAuthRepository } from './interfaces';

export class AuthRepository implements IAuthRepository {
  public checkLogin(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    return comparePassword(password, storedPassword);
  }
}
