import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameTakenException extends HttpException {
  constructor() {
    super('Username already in use', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
