import { UserController } from '../../user/controller';
import { IUserController } from '../../user/interfaces';
import makeUserService from '../service/UserServiceFactory';

const makeUserController = (): IUserController => {
  const service = makeUserService();
  return new UserController(service);
};

export default makeUserController;
