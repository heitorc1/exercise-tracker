import { z } from 'zod';
import { exerciseSchema, userSchema } from './schemas';

type UserSchema = z.infer<typeof userSchema>;

export interface User extends UserSchema {
  id?: string;
}

export type Exercise = z.infer<typeof exerciseSchema>;

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
