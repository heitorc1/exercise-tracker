import { IExerciseService } from 'domain/exercises/interfaces';
import makeExerciseRepository from '../repository/ExerciseRepositoryFactory';
import { ExerciseService } from 'domain/exercises/service';

const makeExerciseService = (): IExerciseService => {
  const repository = makeExerciseRepository();
  return new ExerciseService(repository);
};

export default makeExerciseService;
