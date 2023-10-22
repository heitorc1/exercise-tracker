import { ExerciseQueries } from 'domain/exercises/queries';
import unitTestDb from '..';
import { IExerciseQueries } from 'domain/exercises/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import userHelper from './UserHelper';

class ExerciseHelper {
  constructor(private readonly exerciseQueries: IExerciseQueries) {}

  public createExercise(userId: string) {
    const uuid = uuidv4();
    const description = faker.lorem.sentence();
    const duration = faker.number.int({ min: 10, max: 100 });
    const date = faker.date.recent().toISOString();
    const dbDates = new Date().toISOString();

    return this.exerciseQueries.create({
      id: uuid,
      description: description,
      userId: userId,
      duration: duration,
      date: date,
      createdAt: dbDates,
      updatedAt: dbDates,
    });
  }

  public findFirst() {
    const exercise = this.exerciseQueries.findFirst();

    if (!exercise) {
      const user = userHelper.getUser();
      const newExercise = this.createExercise(user.id);
      return newExercise;
    }

    return exercise;
  }
}

const queries = new ExerciseQueries(unitTestDb);
const exerciseHelper = new ExerciseHelper(queries);
export default exerciseHelper;
