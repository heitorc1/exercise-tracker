import { UsernameTakenError } from '../../infra/exception/UsernameTakenError';
import { ICreateExercise, ICreateUser } from './interfaces';
import { userRepository } from './repository';

export class UserService {
  public async list() {
    return userRepository.list();
  }

  public async create(data: ICreateUser) {
    const usernameTaken = await userRepository.hasUsername(data.username);
    if (usernameTaken) {
      throw new UsernameTakenError('Username already in use');
    }

    return userRepository.create(data);
  }

  public async createExercise(id: string, body: ICreateExercise) {
    return userRepository.createExercise(id, body);
  }
}

export const userService = new UserService();
