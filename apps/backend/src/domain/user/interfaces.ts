import { z } from 'zod';
import {
  createExerciseSchema,
  createUserSchema,
  updateUserSchema,
} from './schemas';

export interface ICreateUser extends z.infer<typeof createUserSchema> {}
export interface IUpdateUser extends z.infer<typeof updateUserSchema> {}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IExercise {
  id: string;
  userId: string;
  description: string;
  duration: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateExercise extends z.infer<typeof createExerciseSchema> {}

export interface IResponse<T> {
  data: T;
}

export interface IUserService {
  list(): Promise<IResponse<IUser[] | null>>;
  create(data: ICreateUser): Promise<IResponse<IUser>>;
  update(id: string, data: IUpdateUser): Promise<IResponse<IUser>>;
  createExercise(
    id: string,
    body: ICreateExercise,
  ): Promise<IResponse<IExercise>>;
}

export interface IUserRepository {
  list(): Promise<IUser[] | null>;
  create(data: ICreateUser): Promise<IUser>;
  update(id: string, data: IUpdateUser): Promise<IUser>;
  hasUsername(username: string): Promise<boolean>;
  hasEmail(email: string): Promise<boolean>;
  createExercise(id: string, body: ICreateExercise): Promise<IExercise>;
}
