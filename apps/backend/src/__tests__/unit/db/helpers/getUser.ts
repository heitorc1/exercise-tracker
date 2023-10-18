import { IUser } from 'domain/user/interfaces';
import unitTestDb from '..';

export async function getUser() {
  return unitTestDb.prepare('SELECT * FROM users').get() as IUser;
}
