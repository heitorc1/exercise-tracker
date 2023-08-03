export interface IUser {
  _id: string;
  username: string;
}

export type GetUserResponse = Response<IUser>;

interface Response<T> {
  data: T[];
  status: number;
}
