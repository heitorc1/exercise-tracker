import { z } from 'zod';
import { exerciseSchema, userSchema } from './schemas';
import { Exercise } from '@prisma/client';

export type UserSchema = z.infer<typeof userSchema>;

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
}

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export interface Response<T> {
  data: T;
}

export interface IUserService {
  list(): Promise<Response<User[]>>;
  create(data: UserSchema): Promise<Response<Omit<User, 'password'>>>;
  createExercise(id: string, body: ExerciseSchema): Promise<Response<Exercise>>;
}

export interface IUserRepository {
  list(): Promise<User[]>;
  create(data: UserSchema): Promise<User>;
  hasUsername(username: string): Promise<boolean>;
  hasEmail(email: string): Promise<boolean>;
  createExercise(id: string, body: ExerciseSchema): Promise<Exercise>;
}
