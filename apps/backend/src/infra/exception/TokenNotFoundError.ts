import { BaseError } from './BaseError';

export class TokenNotFoundError extends BaseError {
  constructor() {
    super('Token not found', 401);
  }
}
