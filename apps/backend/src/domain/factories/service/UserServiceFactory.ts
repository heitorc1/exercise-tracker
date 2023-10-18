import { IUserService } from 'domain/user/interfaces';
import { UserService } from 'domain/user/service';
import makeUserRepository from '../repository/UserRepositoryFactory';

const makeUserService = (): IUserService => {
  const repository = makeUserRepository();
  return new UserService(repository);
};

export default makeUserService;
