import { ILoginService } from '../../login/interfaces';
import { LoginRepository } from '../../login/repository';
import { LoginService } from '../../login/service';
import { UserRepository } from '../../user/repository';

const makeLoginService = (): ILoginService => {
  const userRepository = new UserRepository();
  const loginRepository = new LoginRepository();
  return new LoginService(loginRepository, userRepository);
};

export default makeLoginService;
