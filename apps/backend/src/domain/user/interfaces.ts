import { z } from 'zod';
import { createUserSchema, jwtUserSchema, updateUserSchema } from './schemas';

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

export interface IToken extends IUser {
  iat?: number;
  exp?: number;
}

export interface IJwtUser extends z.infer<typeof jwtUserSchema> {}

export interface IResponse<T> {
  data: T;
}

export interface IUserService {
  list(): Promise<IResponse<IUser[]>>;
  create(data: ICreateUser): Promise<IResponse<IUser>>;
  update(id: string, data: IUpdateUser): Promise<IResponse<IUser>>;
  delete(id: string): Promise<IResponse<boolean>>;
}

export interface IUserRepository {
  find(id: string): Promise<IUser | null>;
  getByUsername(username: string): Promise<IUser | null>;
  list(): Promise<IUser[]>;
  create(data: ICreateUser): Promise<IUser>;
  update(id: string, data: IUpdateUser): Promise<IUser>;
  delete(id: string): Promise<boolean>;
  hasUsername(username: string): Promise<boolean>;
  hasEmail(email: string): Promise<boolean>;
}

export interface IUserQueries {
  find(id: string): Promise<IUser | null>;
  list(): Promise<IUser[]>;
  getByUsername(username: string): Promise<IUser | null>;
  create(data: IUser): Promise<IUser>;
  delete(id: string): Promise<boolean>;
  hasEmail(email: string): Promise<boolean>;
  update(id: string, data: Partial<IUser>): Promise<IUser>;
}
