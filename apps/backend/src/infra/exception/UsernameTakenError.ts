import { BaseError } from './BaseError';

export class UsernameTakenError extends BaseError {
  constructor(message: string) {
    super(message, 422);
  }
}
