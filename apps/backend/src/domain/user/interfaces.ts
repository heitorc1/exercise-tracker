import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { z } from 'zod';
import { exerciseSchema, userSchema } from './schemas';

export type User = z.infer<typeof userSchema>;

export type Exercise = z.infer<typeof exerciseSchema>;

export interface IUserController {
  list(req: Request, res: Response, next: NextFunction): Promise<any>;
  create(req: Request, res: Response, next: NextFunction): Promise<any>;
  createExercise(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IUserService {
  list(): Promise<{ data: any[] }>;
  create(data: User): Promise<any>;
  createExercise(id: string, body: Exercise): Promise<any>;
}

export interface IUserRepository {
  list(): Promise<any[]>;
  create(data: User): Promise<any>;
  hasUsername(username: string): Promise<boolean>;
  createExercise(id: string, body: Exercise): Promise<any>;
}
