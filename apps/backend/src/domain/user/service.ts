import { UsernameTakenError } from '../../infra/exception/UsernameTakenError';
import {
  ICreateExercise,
  ICreateUser,
  IUserRepository,
  IUserService,
} from './interfaces';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public list = async () => {
    const response = await this.userRepository.list();

    return {
      data: response,
    };
  };

  public create = async (data: ICreateUser) => {
    const usernameTaken = await this.userRepository.hasUsername(data.username);
    if (usernameTaken) {
      throw new UsernameTakenError();
    }

    const response = await this.userRepository.create(data);

    return {
      data: response,
    };
  };

  public createExercise = async (id: string, body: ICreateExercise) => {
    const response = await this.userRepository.createExercise(id, body);

    return {
      data: response,
    };
  };
}
