export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface ICreateExercise {
  description: string;
  duration: number;
  date: Date;
}
