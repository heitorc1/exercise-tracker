import { BaseError } from './BaseError';

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Invalid credentials', 404);
  }
}
