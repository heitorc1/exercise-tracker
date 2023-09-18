import { UserRepository } from '../../user/repository';
import { UserService } from '../../user/service';

const makeUserService = (): UserService => {
  const repository = new UserRepository();
  return new UserService(repository);
};

export default makeUserService;
