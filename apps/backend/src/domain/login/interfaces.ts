import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { loginSchema } from './schemas';

export type Login = z.infer<typeof loginSchema>;

export interface ILoginService {
  login: (data: Login) => Promise<{ data: boolean }>;
}

export interface ILoginRepository {
  checkLogin: (data: Login) => Promise<boolean>;
}
