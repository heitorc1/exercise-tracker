import { Response } from ".";

export interface IExercise {
  id: string;
  description: string;
  duration: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type GetExerciseListResponse = Response<IExercise[]>;
