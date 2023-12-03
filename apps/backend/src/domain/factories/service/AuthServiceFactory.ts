import { AuthService } from '@/domain/auth/service';
import { IAuthService } from '@/domain/auth/interfaces';
import makeAuthRepository from '../repository/AuthRepositoryFactory';
import makeUserRepository from '../repository/UserRepositoryFactory';

const makeAuthService = (): IAuthService => {
  const userRepository = makeUserRepository();
  const authRepository = makeAuthRepository();
  return new AuthService(authRepository, userRepository);
};

export default makeAuthService;
