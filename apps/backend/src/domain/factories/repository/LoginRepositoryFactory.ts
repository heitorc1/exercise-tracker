import { ILoginRepository } from 'domain/login/interfaces';
import { LoginRepository } from 'domain/login/repository';
import db from 'infra/db';

const makeLoginRepository = (): ILoginRepository => {
  return new LoginRepository(db);
};

export default makeLoginRepository;
