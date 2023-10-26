import { Response } from ".";

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type GetUserResponse = Response<IUser>;

export type GetUsersResponse = Response<IUser[]>;
