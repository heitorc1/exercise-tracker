import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface ICreateExercise {
  description: string;
  duration: number;
  date: Date;
}

export interface IUserController {
  list(req: Request, res: Response, next: NextFunction): Promise<any>;
  create(req: Request, res: Response, next: NextFunction): Promise<any>;
  createExercise(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IUserService {
  list(): Promise<{ data: any[] }>;
  create(data: ICreateUser): Promise<any>;
  createExercise(id: string, body: ICreateExercise): Promise<any>;
}

export interface IUserRepository {
  list(): Promise<any[]>;
  create(data: ICreateUser): Promise<any>;
  hasUsername(username: string): Promise<boolean>;
  createExercise(id: string, body: ICreateExercise): Promise<any>;
}
