import { LoginController } from '../../login/controller';
import { ILoginController } from '../../login/interfaces';
import makeLoginService from '../service/LoginServiceFactory';

const makeLoginController = (): ILoginController => {
  const service = makeLoginService();
  return new LoginController(service);
};

export default makeLoginController;
