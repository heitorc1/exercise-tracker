import { IExerciseQueries } from 'domain/exercises/interfaces';
import { ExerciseQueries } from 'domain/exercises/queries';
import db from 'infra/db';

const makeExerciseQueries = (): IExerciseQueries => {
  return new ExerciseQueries(db);
};

export default makeExerciseQueries;
