import { z } from 'zod';
import { IResponse, IUser } from 'domain/user/interfaces';
import { loginSchema, verifySchema } from './schemas';

export interface ILogin extends z.infer<typeof loginSchema> {}
export interface IVerifyToken extends z.infer<typeof verifySchema> {}

export interface IAuthService {
  login: (data: ILogin) => Promise<IResponse<string>>;
  verifyToken: (token: IVerifyToken) => IResponse<IUser>;
}

export interface IAuthRepository {
  checkLogin: (password: string, storedPassword: string) => Promise<boolean>;
}
