import { ILoginService } from 'domain/login/interfaces';
import { LoginService } from 'domain/login/service';
import makeUserRepository from '../repository/UserRepositoryFactory';
import makeLoginRepository from '../repository/LoginRepositoryFactory';

const makeLoginService = (): ILoginService => {
  const userRepository = makeUserRepository();
  const loginRepository = makeLoginRepository();
  return new LoginService(loginRepository, userRepository);
};

export default makeLoginService;
