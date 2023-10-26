import { AuthService } from 'domain/auth/service';
import makeAuthRepository from '../repository/AuthRepositoryFactory';
import makeUserRepository from '../repository/UserRepositoryFactory';
import { IAuthService } from 'domain/auth/interfaces';

const makeAuthService = (): IAuthService => {
  const userRepository = makeUserRepository();
  const authRepository = makeAuthRepository();
  return new AuthService(authRepository, userRepository);
};

export default makeAuthService;
