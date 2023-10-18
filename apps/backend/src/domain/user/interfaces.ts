import { z } from 'zod';
import { exerciseSchema, userSchema } from './schemas';

export type UserSchema = z.infer<typeof userSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Exercise {
  id: string;
  userId: string;
  description: string;
  duration: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export interface Response<T> {
  data: T;
}

export interface IUserService {
  list(): Promise<Response<User[] | null>>;
  create(data: UserSchema): Promise<Response<User>>;
  createExercise(id: string, body: ExerciseSchema): Promise<Response<Exercise>>;
}

export interface IUserRepository {
  list(): Promise<User[] | null>;
  create(data: UserSchema): Promise<User>;
  hasUsername(username: string): Promise<boolean>;
  hasEmail(email: string): Promise<boolean>;
  createExercise(id: string, body: ExerciseSchema): Promise<Exercise>;
}
