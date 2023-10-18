import { IUserRepository } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import db from 'infra/db';

const makeUserRepository = (): IUserRepository => {
  return new UserRepository(db);
};

export default makeUserRepository;
