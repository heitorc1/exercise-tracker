import { z } from 'zod';
import {
  createExerciseSchema,
  findExerciseSchema,
  updateExerciseSchema,
} from './schemas';

export interface IExercise {
  id: string;
  userId: string;
  description: string;
  duration: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFindExercise extends z.infer<typeof findExerciseSchema> {}
export interface ICreateExercise extends z.infer<typeof createExerciseSchema> {}
export interface IUpdateExercise extends z.infer<typeof updateExerciseSchema> {}

export interface IResponse<T> {
  data: T;
}

export interface IExerciseService {
  find(id: string, userId: string): IResponse<IExercise | null>;
  list(userId: string): IResponse<IExercise[]>;
  create(userId: string, body: ICreateExercise): IResponse<IExercise>;
  update(
    id: string,
    userId: string,
    body: IUpdateExercise,
  ): IResponse<IExercise>;
  delete(id: string, userId: string): IResponse<boolean>;
}

export interface IExerciseRepository {
  find(id: string, userId: string): IExercise | null;
  list(userId: string): IExercise[];
  create(userId: string, body: ICreateExercise): IExercise;
  update(id: string, body: IUpdateExercise): IExercise;
  delete(id: string): boolean;
}

export interface IExerciseQueries {
  find(id: string, userId: string): IExercise | undefined;
  list(userId: string): IExercise[];
  create(body: IExercise): IExercise;
  update(id: string, body: Partial<IExercise>): IExercise;
  delete(id: string): boolean;
  findFirst(): IExercise | undefined;
}
