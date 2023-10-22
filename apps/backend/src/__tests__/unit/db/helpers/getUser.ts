import { IUser } from 'domain/user/interfaces';
import unitTestDb from '..';

export function getUser() {
  return unitTestDb.prepare('SELECT * FROM users').get() as IUser;
}
