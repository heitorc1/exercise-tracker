import { z } from 'zod';
import { loginSchema } from './schemas';
import { IResponse, IUser } from 'domain/user/interfaces';

export interface ILogin extends z.infer<typeof loginSchema> {}

export interface ILoginService {
  login: (data: ILogin) => Promise<IResponse<string>>;
}

export interface ILoginRepository {
  checkLogin: (data: ILogin) => Promise<IUser | null>;
}
