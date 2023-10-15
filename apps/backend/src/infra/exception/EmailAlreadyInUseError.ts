import { BaseError } from './BaseError';

export class EmailAlreadyInUseError extends BaseError {
  constructor() {
    super('Email already in use', 422);
  }
}
