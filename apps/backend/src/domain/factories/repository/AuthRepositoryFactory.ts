import { IAuthRepository } from 'domain/auth/interfaces';
import { AuthRepository } from 'domain/auth/repository';

const makeAuthRepository = (): IAuthRepository => {
  return new AuthRepository();
};

export default makeAuthRepository;
