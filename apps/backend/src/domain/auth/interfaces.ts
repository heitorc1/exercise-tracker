import { z } from 'zod';
import { loginSchema, verifySchema } from './schemas';
import { IResponse, IUser } from 'domain/user/interfaces';

export interface ILogin extends z.infer<typeof loginSchema> {}
export interface IVerifyToken extends z.infer<typeof verifySchema> {}

export interface IAuthService {
  login: (data: ILogin) => Promise<IResponse<string>>;
  verifyToken: (token: IVerifyToken) => IResponse<IUser>;
}

export interface IAuthRepository {
  checkLogin: (data: ILogin) => Promise<IUser | null>;
}
