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
  duration: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateExercise extends z.infer<typeof createExerciseSchema> {}

export interface IResponse<T> {
  data: T;
}

export interface IUserService {
  list(): IResponse<IUser[] | null>;
  create(data: ICreateUser): Promise<IResponse<IUser>>;
  update(id: string, data: IUpdateUser): Promise<IResponse<IUser>>;
  createExercise(id: string, body: ICreateExercise): IResponse<IExercise>;
}

export interface IUserRepository {
  list(): IUser[] | null;
  create(data: ICreateUser): Promise<IUser>;
  update(id: string, data: IUpdateUser): Promise<IUser>;
  hasUsername(username: string): boolean;
  hasEmail(email: string): boolean;
  createExercise(id: string, body: ICreateExercise): IExercise;
}

export interface IUserQueries {
  list(): IUser[] | null;
  getByUsername(username: string): IUser | undefined;
  create(data: IUser): IUser;
  hasEmail(email: string): boolean;
  update(id: string, data: Partial<IUser>): IUser;
  createExercise(id: string, body: IExercise): IExercise;
}
