import { IUserQueries } from 'domain/user/interfaces';
import { UserQueries } from 'domain/user/queries';
import db from 'infra/db';

const makeUserQueries = (): IUserQueries => {
  return new UserQueries(db);
};

export default makeUserQueries;
