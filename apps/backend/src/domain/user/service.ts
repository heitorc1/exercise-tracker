import { UsernameTakenError } from 'infra/exception/UsernameTakenError';
import {
  ICreateExercise,
  IUpdateUser,
  IUserRepository,
  IUserService,
  ICreateUser,
} from './interfaces';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public list() {
    const response = this.userRepository.list();

    return {
      data: response,
    };
  }

  public async create(data: ICreateUser) {
    this.verifyUsername(data.username);
    this.verifyEmail(data.email);

    const response = await this.userRepository.create(data);

    return {
      data: response,
    };
  }

  public async update(id: string, data: IUpdateUser) {
    if (Object.values(data).every((x) => !x)) {
      throw new NothingToUpdateError();
    }

    if (data.username) {
      this.verifyUsername(data.username);
    }

    if (data.email) {
      this.verifyUsername(data.email);
    }

    const response = await this.userRepository.update(id, data);

    return { data: response };
  }

  public createExercise(id: string, body: ICreateExercise) {
    const response = this.userRepository.createExercise(id, body);

    return {
      data: response,
    };
  }

  private verifyUsername(username: string) {
    const usernameTaken = this.userRepository.hasUsername(username);
    if (usernameTaken) {
      throw new UsernameTakenError();
    }
  }

  private verifyEmail(email: string) {
    const emailInUse = this.userRepository.hasEmail(email);
    if (emailInUse) {
      throw new EmailAlreadyInUseError();
    }
  }
}
