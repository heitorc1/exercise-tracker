import { User } from '../../src/domain/user/interfaces';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
