import { BaseError } from './BaseError';

export class UserNotFoundError extends BaseError {
  constructor() {
    super('User not found', 404);
  }
}
