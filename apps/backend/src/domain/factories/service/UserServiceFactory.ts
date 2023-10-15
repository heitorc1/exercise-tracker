import { IUserService } from '../../user/interfaces';
import { UserRepository } from '../../user/repository';
import { UserService } from '../../user/service';

const makeUserService = (): IUserService => {
  const repository = new UserRepository();
  return new UserService(repository);
};

export default makeUserService;
