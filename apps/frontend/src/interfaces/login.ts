import { Response } from ".";

export interface ILogin {
  username: string;
  password: string;
}

export type ILoginResponse = Response<string>;
