import { z } from 'zod';
import {
  createExerciseSchema,
  findExerciseSchema,
  updateExerciseSchema,
} from '@exercise-tracker/shared/schemas/exercise';

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

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
  };
}

export interface IPaginatedQuery<T> {
  data: T[];
  total: number;
}

export interface IExerciseService {
  find(id: string, userId: string): Promise<IResponse<IExercise | null>>;
  list(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<IPaginatedResponse<IExercise>>;
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
  list(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<IPaginatedQuery<IExercise>>;
  create(userId: string, body: ICreateExercise): Promise<IExercise>;
  update(id: string, body: IUpdateExercise): Promise<IExercise>;
  delete(id: string): Promise<boolean>;
}

export interface IExerciseQueries {
  find(id: string, userId: string): Promise<IExercise | null>;
  list(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<IPaginatedQuery<IExercise>>;
  create(body: IExercise): Promise<IExercise>;
  update(id: string, body: Partial<IExercise>): Promise<IExercise>;
  delete(id: string): Promise<boolean>;
}
