import { ExerciseNotFoundError } from 'infra/exception/ExerciseNotFoundError';
import {
  ICreateExercise,
  IExerciseService,
  IExerciseRepository,
  IExercise,
  IResponse,
  IUpdateExercise,
} from './interfaces';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';

export class ExerciseService implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository) {}

  public find(id: string, userId: string): IResponse<IExercise | null> {
    const exercise = this.getExercise(id, userId);

    return {
      data: exercise,
    };
  }

  public create(userId: string, body: ICreateExercise) {
    const response = this.exerciseRepository.create(userId, body);

    return {
      data: response,
    };
  }

  public list(userId: string): IResponse<IExercise[]> {
    const exercises = this.exerciseRepository.list(userId);
    return { data: exercises };
  }

  public update(
    id: string,
    userId,
    body: IUpdateExercise,
  ): IResponse<IExercise> {
    if (Object.values(body).every((x) => !x)) {
      throw new NothingToUpdateError();
    }

    this.getExercise(id, userId);

    const response = this.exerciseRepository.update(id, body);

    return {
      data: response,
    };
  }

  public delete(id: string, userId: string): IResponse<boolean> {
    this.getExercise(id, userId);

    const response = this.exerciseRepository.delete(id);

    return {
      data: response,
    };
  }

  private getExercise(id: string, userId: string): IExercise {
    const exercise = this.exerciseRepository.find(id, userId);

    if (!exercise) {
      throw new ExerciseNotFoundError();
    }

    return exercise;
  }
}
