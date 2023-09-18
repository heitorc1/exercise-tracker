import { BaseError } from './BaseError';

export class UsernameTakenError extends BaseError {
  constructor() {
    super('Username already in use', 422);
  }
}
