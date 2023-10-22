import { BaseError } from './BaseError';

export class ExerciseNotFoundError extends BaseError {
  constructor() {
    super('Exercise not found', 404);
  }
}
