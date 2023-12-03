import { z } from 'zod';
import {
  loginSchema,
  verifySchema,
} from '@exercise-tracker/shared/schemas/auth';
import { IResponse, IUser } from '@/domain/user/interfaces';

export interface ILogin extends z.infer<typeof loginSchema> {}
export interface IVerifyToken extends z.infer<typeof verifySchema> {}

export interface IAuthService {
  login: (data: ILogin) => Promise<IResponse<string>>;
  verifyToken: (token: IVerifyToken) => IResponse<IUser>;
}

export interface IAuthRepository {
  checkLogin: (password: string, storedPassword: string) => Promise<boolean>;
}
