export interface IUser {
  _id: string;
  username: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type GetUserResponse = Response<IUser>;

interface Response<T> {
  data: T[];
  status: number;
}
