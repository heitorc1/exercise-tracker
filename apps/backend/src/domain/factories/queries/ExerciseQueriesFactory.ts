import { IExerciseQueries } from '@/domain/exercises/interfaces';
import { ExerciseQueries } from '@/domain/exercises/queries';

const makeExerciseQueries = (): IExerciseQueries => {
  return new ExerciseQueries();
};

export default makeExerciseQueries;
