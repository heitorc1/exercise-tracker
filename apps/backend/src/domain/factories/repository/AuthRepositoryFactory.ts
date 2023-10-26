import { IAuthRepository } from 'domain/auth/interfaces';
import { AuthRepository } from 'domain/auth/repository';
import makeUserQueries from '../queries/UserQueriesFactory';

const makeAuthRepository = (): IAuthRepository => {
  const userQueries = makeUserQueries();
  return new AuthRepository(userQueries);
};

export default makeAuthRepository;
