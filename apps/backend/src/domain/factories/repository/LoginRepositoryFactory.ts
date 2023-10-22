import { ILoginRepository } from 'domain/login/interfaces';
import { LoginRepository } from 'domain/login/repository';
import makeUserQueries from '../queries/UserQueriesFactory';

const makeLoginRepository = (): ILoginRepository => {
  const userQueries = makeUserQueries();
  return new LoginRepository(userQueries);
};

export default makeLoginRepository;
