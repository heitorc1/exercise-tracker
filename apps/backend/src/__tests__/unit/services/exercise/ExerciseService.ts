import { faker } from '@faker-js/faker';
import unitTestDb from '__tests__/unit/db';
import exerciseHelper from '__tests__/unit/db/helpers/ExerciseHelper';
import userHelper from '__tests__/unit/db/helpers/UserHelper';
import {
  IExerciseQueries,
  IExerciseRepository,
  IExerciseService,
} from 'domain/exercises/interfaces';
import { ExerciseQueries } from 'domain/exercises/queries';
import { ExerciseRepository } from 'domain/exercises/repository';
import { ExerciseService } from 'domain/exercises/service';
import { ExerciseNotFoundError } from 'infra/exception/ExerciseNotFoundError';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';

describe('UserService', () => {
  let repository: IExerciseRepository;
  let service: IExerciseService;
  let userQueries: IExerciseQueries;

  beforeAll(() => {
    userQueries = new ExerciseQueries(unitTestDb);
    repository = new ExerciseRepository(userQueries);
    service = new ExerciseService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find an exercise by id', () => {
    const exercise = exerciseHelper.findFirst();

    const response = service.find(exercise.id, exercise.userId);

    expect(response.data).toStrictEqual(exercise);
  });

  it('should not find an exercise by invalid id', () => {
    const user = userHelper.getUser();
    const id = faker.string.uuid();

    expect(() => service.find(id, user.id)).toThrowError(ExerciseNotFoundError);
  });

  it('should create an exercise', () => {
    const user = userHelper.getUser();
    const exercise = {
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 10, max: 100 }),
      date: faker.date.recent().toISOString(),
    };

    const response = service.create(user.id, exercise);

    expect(response.data.description).toBe(exercise.description);
    expect(response.data.duration).toBe(exercise.duration);
    expect(response.data.date).toBe(exercise.date);
  });

  it('should list user exercises', () => {
    const user = userHelper.getUser();
    exerciseHelper.createExercise(user.id);

    const response = service.list(user.id);

    expect(response.data.length).toBeGreaterThan(1);
  });

  it('should return an empty array when there is no exercise', async () => {
    const user = await userHelper.insertUser(
      faker.internet.userName(),
      faker.internet.password(),
    );

    const response = service.list(user.id);

    expect(response.data.length).toBe(0);
  });

  it('should update an exercise', () => {
    const date = new Date('2023-10-18');
    jest.useFakeTimers().setSystemTime(date);

    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      description: 'New description',
      duration: 55,
      date: new Date().toISOString(),
    };

    const response = service.update(exercise.id, user.id, updateObject);

    expect(response.data).toMatchObject({
      ...exercise,
      description: updateObject.description,
      duration: updateObject.duration,
      date: updateObject.date,
    });
  });

  it('should not update an exercise with invalid userId', () => {
    const invalidUserId = faker.string.uuid();
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      description: 'New description',
      duration: 55,
      date: new Date().toISOString(),
    };

    expect(() =>
      service.update(exercise.id, invalidUserId, updateObject),
    ).toThrowError(ExerciseNotFoundError);
  });

  it('should update an exercise duration', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      duration: 55,
    };

    const response = service.update(exercise.id, user.id, updateObject);

    expect(response.data).toMatchObject({
      ...exercise,
      duration: updateObject.duration,
    });
  });

  it('should update an exercise description', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      description: 'New description',
    };

    const response = service.update(exercise.id, user.id, updateObject);

    expect(response.data).toMatchObject({
      ...exercise,
      description: updateObject.description,
    });
  });

  it('should update an exercise date', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      date: new Date().toISOString(),
    };

    const response = service.update(exercise.id, user.id, updateObject);

    expect(response.data).toMatchObject({
      ...exercise,
      date: updateObject.date,
    });
  });

  it('should not update an exercise without data', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {};

    expect(() =>
      service.update(exercise.id, user.id, updateObject),
    ).toThrowError(NothingToUpdateError);
  });

  it('should delete an exercise', () => {
    const exercise = exerciseHelper.findFirst();

    const response = service.delete(exercise.id, exercise.userId);

    expect(response.data).toBe(true);
  });

  it('should not update an exercise with invalid userId', () => {
    const invalidUserId = faker.string.uuid();
    const exercise = exerciseHelper.findFirst();

    expect(() => service.delete(exercise.id, invalidUserId)).toThrowError(
      ExerciseNotFoundError,
    );
  });
});
