import assert from 'node:assert';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import { faker } from '@faker-js/faker';
import {
  IExerciseQueries,
  IExerciseRepository,
  IExerciseService,
} from 'domain/exercises/interfaces';
import { ExerciseRepository } from 'domain/exercises/repository';
import { ExerciseService } from 'domain/exercises/service';
import { ExerciseNotFoundError } from 'infra/exception/ExerciseNotFoundError';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';

describe('ExerciseService', () => {
  let repository: IExerciseRepository;
  let service: IExerciseService;
  let userQueries: IExerciseQueries;

  beforeEach(() => {
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

  it('should find an exercise by id', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);

    const response = await service.find(exercise.id, exercise.userId);

    assert.deepStrictEqual(response.data, exercise);
  });

  it('should not find an exercise by invalid id', async (t) => {
    const id = faker.string.uuid();
    const userId = faker.string.uuid();

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => null);

    assert.rejects(
      async () => await service.find(id, userId),
      ExerciseNotFoundError,
    );
  });

  it('should create an exercise', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'create')
      .mock.mockImplementationOnce(async () => exercise);

    const response = await service.create(exercise.userId, exercise);

    assert.deepStrictEqual(response.data, exercise);
  });

  it('should list user exercises', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'list')
      .mock.mockImplementationOnce(async () => [exercise]);

    const response = await service.list(exercise.userId);

    assert(response.data.length >= 1);
    assert.deepStrictEqual(response.data[0], exercise);
  });

  it('should return an empty array when there is no exercise', async (t) => {
    const id = faker.string.uuid();

    t.mock
      .method(ExerciseRepository.prototype, 'list')
      .mock.mockImplementationOnce(async () => []);

    const response = await service.list(id);

    assert.deepEqual(response.data.length, 0);
  });

  it('should update an exercise', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {
      description: 'New description',
      duration: 55,
      date: new Date().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);
    t.mock
      .method(ExerciseRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        ...exercise,
        description: updateObject.description,
        duration: updateObject.duration,
        date: updateObject.date,
      }));

    const response = await service.update(
      exercise.id,
      exercise.userId,
      updateObject,
    );

    assert.deepStrictEqual(response.data, {
      ...exercise,
      description: updateObject.description,
      duration: updateObject.duration,
      date: updateObject.date,
    });
  });

  it('should not update an exercise with invalid userId', async (t) => {
    const invalidId = faker.string.uuid();
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {
      description: 'New description',
      duration: 55,
      date: new Date().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => null);

    assert.rejects(
      async () => await service.update(exercise.id, invalidId, updateObject),
      ExerciseNotFoundError,
    );
  });

  it('should update an exercise duration', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {
      duration: 55,
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);
    t.mock
      .method(ExerciseRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        ...exercise,
        duration: updateObject.duration,
      }));

    const response = await service.update(
      exercise.id,
      exercise.userId,
      updateObject,
    );

    assert.deepStrictEqual(response.data, {
      ...exercise,
      duration: updateObject.duration,
    });
  });

  it('should update an exercise description', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {
      description: 'New description',
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);
    t.mock
      .method(ExerciseRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        ...exercise,
        description: updateObject.description,
      }));

    const response = await service.update(
      exercise.id,
      exercise.userId,
      updateObject,
    );

    assert.deepStrictEqual(response.data, {
      ...exercise,
      description: updateObject.description,
    });
  });

  it('should update an exercise date', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {
      date: new Date().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);
    t.mock
      .method(ExerciseRepository.prototype, 'update')
      .mock.mockImplementationOnce(async () => ({
        ...exercise,
        date: updateObject.date,
      }));

    const response = await service.update(
      exercise.id,
      exercise.userId,
      updateObject,
    );

    assert.deepStrictEqual(response.data, {
      ...exercise,
      date: updateObject.date,
    });
  });

  it('should not update an exercise without data', async () => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const updateObject = {};

    assert.rejects(
      async () =>
        await service.update(exercise.id, exercise.userId, updateObject),
      NothingToUpdateError,
    );
  });

  it('should delete an exercise', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => exercise);
    t.mock
      .method(ExerciseRepository.prototype, 'delete')
      .mock.mockImplementationOnce(async () => true);

    const response = await service.delete(exercise.id, exercise.userId);

    assert.deepEqual(response.data, true);
  });

  it('should not delete an exercise with invalid userId', async (t) => {
    const exercise = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
    const invalidUserId = faker.string.uuid();

    t.mock
      .method(ExerciseRepository.prototype, 'find')
      .mock.mockImplementationOnce(async () => null);

    assert.rejects(
      async () => await service.delete(exercise.id, invalidUserId),
      ExerciseNotFoundError,
    );
  });
});
