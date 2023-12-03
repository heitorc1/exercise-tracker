import { IExerciseRepository } from '@/domain/exercises/interfaces';
import { ExerciseRepository } from '@/domain/exercises/repository';
import makeExerciseQueries from '../queries/ExerciseQueriesFactory';

const makeExerciseRepository = (): IExerciseRepository => {
  const exerciseQueries = makeExerciseQueries();
  return new ExerciseRepository(exerciseQueries);
};

export default makeExerciseRepository;
