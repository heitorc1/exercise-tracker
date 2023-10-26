import { v4 as uuidv4 } from 'uuid';
import {
  ICreateExercise,
  IExercise,
  IExerciseQueries,
  IExerciseRepository,
  IUpdateExercise,
} from './interfaces';

export class ExerciseRepository implements IExerciseRepository {
  constructor(private readonly exerciseQueries: IExerciseQueries) {}

  public find(id: string, userId: string): IExercise | null {
    const exercise = this.exerciseQueries.find(id, userId);

    if (!exercise) {
      return null;
    }

    return exercise;
  }

  public create(userId: string, body: ICreateExercise) {
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

  public list(userId: string): IExercise[] {
    return this.exerciseQueries.list(userId);
  }

  public update(id: string, body: IUpdateExercise): IExercise {
    const date = new Date().toISOString();
    return this.exerciseQueries.update(id, {
      ...body,
      updatedAt: date,
    });
  }

  public delete(id: string): boolean {
    return this.exerciseQueries.delete(id);
  }
}
