import { z } from 'zod';
import { loginSchema } from './schemas';
import { Response, User } from 'domain/user/interfaces';

export type Login = z.infer<typeof loginSchema>;

export interface ILoginService {
  login: (data: Login) => Promise<Response<string>>;
}

export interface ILoginRepository {
  checkLogin: (data: Login) => Promise<User | null>;
}
