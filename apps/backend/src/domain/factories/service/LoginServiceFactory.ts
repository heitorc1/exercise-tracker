import { ILoginService } from 'domain/login/interfaces';
import { LoginRepository } from 'domain/login/repository';
import { LoginService } from 'domain/login/service';
import { UserRepository } from 'domain/user/repository';

const makeLoginService = (): ILoginService => {
  const userRepository = new UserRepository();
  const loginRepository = new LoginRepository();
  return new LoginService(loginRepository, userRepository);
};

export default makeLoginService;
