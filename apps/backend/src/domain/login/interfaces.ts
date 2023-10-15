import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { loginSchema } from './schemas';
import { User } from '../user/interfaces';

export type Login = z.infer<typeof loginSchema>;

export interface ILoginService {
  login: (data: Login) => Promise<{ data: string }>;
}

export interface ILoginRepository {
  checkLogin: (data: Login) => Promise<Omit<User, 'password'> | null>;
}
