import { UsernameTakenError } from 'infra/exception/UsernameTakenError';
import { Exercise, User, IUserRepository, IUserService } from './interfaces';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async list() {
    const response = await this.userRepository.list();

    return {
      data: response,
    };
  }

  public async create(data: User) {
    const usernameTaken = await this.userRepository.hasUsername(data.username);
    if (usernameTaken) {
      throw new UsernameTakenError();
    }

    const emailInUse = await this.userRepository.hasEmail(data.email);
    if (emailInUse) {
      throw new EmailAlreadyInUseError();
    }

    const response = await this.userRepository.create(data);

    return {
      data: response,
    };
  }

  public async createExercise(id: string, body: Exercise) {
    const response = await this.userRepository.createExercise(id, body);

    return {
      data: response,
    };
  }
}
