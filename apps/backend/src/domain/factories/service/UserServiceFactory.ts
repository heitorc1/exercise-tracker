import { IUserService } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import { UserService } from 'domain/user/service';

const makeUserService = (): IUserService => {
  const repository = new UserRepository();
  return new UserService(repository);
};

export default makeUserService;
