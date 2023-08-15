import { UsernameTakenError } from '../../../infra/exception/UsernameTakenError';
import { CreateExerciseDTO } from '../dto/create-exercise.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { userRepository } from '../repository/user.repository';

export class UserService {
  public async list() {
    return userRepository.list();
  }

  public async create(data: CreateUserDTO) {
    const usernameTaken = await userRepository.hasUsername(data.username);
    if (usernameTaken) {
      throw new UsernameTakenError('Username already in use');
    }

    return userRepository.create(data);
  }

  public async createExercise(id: string, body: CreateExerciseDTO) {
    return userRepository.createExercise(id, body);
  }
}

export const userService = new UserService();
