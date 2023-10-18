import { BaseError } from './BaseError';

export class NothingToUpdateError extends BaseError {
  constructor() {
    super('Nothing to update', 400);
  }
}
