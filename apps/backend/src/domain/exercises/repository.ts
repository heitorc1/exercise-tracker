import { v4 as uuidv4 } from 'uuid';
import {
  ICreateExercise,
  IExercise,
  IExerciseQueries,
  IExerciseRepository,
  IUpdateExercise,
  IPaginatedQuery,
} from './interfaces';

export class ExerciseRepository implements IExerciseRepository {
  constructor(private readonly exerciseQueries: IExerciseQueries) {}

  public async find(id: string, userId: string): Promise<IExercise | null> {
    const exercise = this.exerciseQueries.find(id, userId);

    if (!exercise) {
      return null;
    }

    return exercise;
  }

  public async create(
    userId: string,
    body: ICreateExercise,
  ): Promise<IExercise> {
    const uuid = uuidv4();
    const date = new Date().toISOString();
    const formattedDate = new Date(body.date).toISOString();

    return this.exerciseQueries.create({
      id: uuid,
      description: body.description,
      userId: userId,
      duration: body.duration,
      date: formattedDate,
      createdAt: date,
      updatedAt: date,
    });
  }

  public async list(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<IPaginatedQuery<IExercise>> {
    return this.exerciseQueries.list(userId, page, pageSize);
  }

  public async update(id: string, body: IUpdateExercise): Promise<IExercise> {
    const date = new Date().toISOString();
    return this.exerciseQueries.update(id, {
      ...body,
      updatedAt: date,
    });
  }

  public async delete(id: string): Promise<boolean> {
    return this.exerciseQueries.delete(id);
  }
}
