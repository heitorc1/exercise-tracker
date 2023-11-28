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
  find(id: string, userId: string): Promise<IResponse<IExercise | null>>;
  list(userId: string): Promise<IResponse<IExercise[]>>;
  create(userId: string, body: ICreateExercise): Promise<IResponse<IExercise>>;
  update(
    id: string,
    userId: string,
    body: IUpdateExercise,
  ): Promise<IResponse<IExercise>>;
  delete(id: string, userId: string): Promise<IResponse<boolean>>;
}

export interface IExerciseRepository {
  find(id: string, userId: string): Promise<IExercise | null>;
  list(userId: string): Promise<IExercise[]>;
  create(userId: string, body: ICreateExercise): Promise<IExercise>;
  update(id: string, body: IUpdateExercise): Promise<IExercise>;
  delete(id: string): Promise<boolean>;
}

export interface IExerciseQueries {
  find(id: string, userId: string): Promise<IExercise | null>;
  list(userId: string): Promise<IExercise[]>;
  create(body: IExercise): Promise<IExercise>;
  update(id: string, body: Partial<IExercise>): Promise<IExercise>;
  delete(id: string): Promise<boolean>;
}
