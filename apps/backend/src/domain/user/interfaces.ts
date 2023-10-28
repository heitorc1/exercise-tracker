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
  list(): IResponse<IUser[]>;
  create(data: ICreateUser): Promise<IResponse<IUser>>;
  update(id: string, data: IUpdateUser): Promise<IResponse<IUser>>;
  delete(id: string): IResponse<boolean>;
}

export interface IUserRepository {
  find(id: string): IUser | undefined;
  list(): IUser[];
  create(data: ICreateUser): Promise<IUser>;
  update(id: string, data: IUpdateUser): Promise<IUser>;
  delete(id: string): boolean;
  hasUsername(username: string): boolean;
  hasEmail(email: string): boolean;
}

export interface IUserQueries {
  find(id: string): IUser | undefined;
  list(): IUser[];
  getByUsername(username: string): IUser | undefined;
  create(data: IUser): IUser;
  delete(id: string): boolean;
  hasEmail(email: string): boolean;
  update(id: string, data: Partial<IUser>): IUser;
  findFirst(): IUser;
}
