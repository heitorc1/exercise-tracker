import { ExerciseNotFoundError } from '@/infra/exception/ExerciseNotFoundError';
import { NothingToUpdateError } from '@/infra/exception/NothingToUpdateError';
import {
  ICreateExercise,
  IExercise,
  IExerciseRepository,
  IExerciseService,
  IResponse,
  IUpdateExercise,
  IPaginatedResponse,
} from './interfaces';

export class ExerciseService implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository) {}

  public async find(
    id: string,
    userId: string,
  ): Promise<IResponse<IExercise | null>> {
    const exercise = await this.getExercise(id, userId);

    return {
      data: exercise,
    };
  }

  public async create(
    userId: string,
    body: ICreateExercise,
  ): Promise<IResponse<IExercise>> {
    const response = await this.exerciseRepository.create(userId, body);

    return {
      data: response,
    };
  }

  public async list(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<IPaginatedResponse<IExercise>> {
    const exercises = await this.exerciseRepository.list(
      userId,
      page,
      pageSize,
    );
    return {
      data: exercises.data,
      meta: {
        page,
        perPage: pageSize,
        from: (page - 1) * pageSize,
        to: page * pageSize,
        total: exercises.total,
      },
    };
  }

  public async update(
    id: string,
    userId: string,
    body: IUpdateExercise,
  ): Promise<IResponse<IExercise>> {
    if (Object.values(body).every((x) => !x)) {
      throw new NothingToUpdateError();
    }

    await this.getExercise(id, userId);

    const response = await this.exerciseRepository.update(id, body);

    return {
      data: response,
    };
  }

  public async delete(id: string, userId: string): Promise<IResponse<boolean>> {
    await this.getExercise(id, userId);

    const response = await this.exerciseRepository.delete(id);

    return {
      data: response,
    };
  }

  private async getExercise(id: string, userId: string): Promise<IExercise> {
    const exercise = await this.exerciseRepository.find(id, userId);

    if (!exercise) {
      throw new ExerciseNotFoundError();
    }

    return exercise;
  }
}
