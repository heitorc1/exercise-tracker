import { Response } from ".";

export interface IToken extends IUser {
  iat: number;
  exp: number;
}

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

export type GetUserResponse = IUser | void;

export type GetUsersResponse = Response<IUser[]>;
