import { IExerciseService } from 'domain/exercises/interfaces';
import { ExerciseService } from 'domain/exercises/service';
import makeExerciseRepository from '../repository/ExerciseRepositoryFactory';

const makeExerciseService = (): IExerciseService => {
  const repository = makeExerciseRepository();
  return new ExerciseService(repository);
};

export default makeExerciseService;
