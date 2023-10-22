import { IUserRepository } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import makeUserQueries from '../queries/UserQueriesFactory';

const makeUserRepository = (): IUserRepository => {
  const userQueries = makeUserQueries();
  return new UserRepository(userQueries);
};

export default makeUserRepository;
