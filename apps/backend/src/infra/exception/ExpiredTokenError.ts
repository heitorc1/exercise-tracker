import { BaseError } from './BaseError';

export class ExpiredTokenError extends BaseError {
  constructor() {
    super('Expired token', 401);
  }
}
