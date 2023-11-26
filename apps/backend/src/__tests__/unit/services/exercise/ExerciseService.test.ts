import assert from 'node:assert';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
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

  beforeEach(() => {
    userQueries = new ExerciseQueries(unitTestDb);
    repository = new ExerciseRepository(userQueries);
    service = new ExerciseService(repository);

    const date = new Date('2023-10-18');
    mock.timers.enable({ apis: ['Date'], now: date });
  });

  afterEach(() => {
    mock.timers.reset();
  });

  it('should be defined', () => {
    assert(service instanceof ExerciseService);
  });

  it('should find an exercise by id', () => {
    const exercise = exerciseHelper.findFirst();

    const response = service.find(exercise.id, exercise.userId);

    assert.deepStrictEqual(response.data, exercise);
  });

  it('should not find an exercise by invalid id', () => {
    const user = userHelper.getUser();
    const id = faker.string.uuid();

    assert.throws(() => service.find(id, user.id), ExerciseNotFoundError);
  });

  it('should create an exercise', () => {
    const user = userHelper.getUser();
    const exercise = {
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 10, max: 100 }),
      date: faker.date.recent().toISOString(),
    };

    const response = service.create(user.id, exercise);

    const { description, date, duration } = response.data;

    assert.deepStrictEqual({ description, date, duration }, exercise);
  });

  it('should list user exercises', () => {
    const user = userHelper.getUser();
    exerciseHelper.createExercise(user.id);

    const response = service.list(user.id);

    assert(response.data.length > 1);
  });

  it('should return an empty array when there is no exercise', async () => {
    const user = await userHelper.insertUser(
      faker.internet.userName(),
      faker.internet.password(),
    );

    const response = service.list(user.id);

    assert.deepEqual(response.data.length, 0);
  });

  it('should update an exercise', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      description: 'New description',
      duration: 55,
      date: new Date().toISOString(),
    };

    const response = service.update(exercise.id, user.id, updateObject);

    assert.deepStrictEqual(response.data, {
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

    assert.throws(
      () => service.update(exercise.id, invalidUserId, updateObject),
      ExerciseNotFoundError,
    );
  });

  it('should update an exercise duration', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {
      duration: 55,
    };

    const response = service.update(exercise.id, user.id, updateObject);

    assert.deepStrictEqual(response.data, {
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

    assert.deepStrictEqual(response.data, {
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

    assert.deepStrictEqual(response.data, {
      ...exercise,
      date: updateObject.date,
    });
  });

  it('should not update an exercise without data', () => {
    const user = userHelper.getUser();
    const exercise = exerciseHelper.createExercise(user.id);
    const updateObject = {};

    assert.throws(
      () => service.update(exercise.id, user.id, updateObject),
      NothingToUpdateError,
    );
  });

  it('should delete an exercise', () => {
    const exercise = exerciseHelper.findFirst();

    const response = service.delete(exercise.id, exercise.userId);

    assert.deepEqual(response.data, true);
  });

  it('should not update an exercise with invalid userId', () => {
    const invalidUserId = faker.string.uuid();
    const exercise = exerciseHelper.findFirst();

    assert.throws(
      () => service.delete(exercise.id, invalidUserId),
      ExerciseNotFoundError,
    );
  });
});
