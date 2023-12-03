import { IUserQueries } from '@/domain/user/interfaces';
import { UserQueries } from '@/domain/user/queries';

const makeUserQueries = (): IUserQueries => {
  return new UserQueries();
};

export default makeUserQueries;
