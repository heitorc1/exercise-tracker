import { UsernameTakenError } from 'infra/exception/UsernameTakenError';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';
import { NothingToUpdateError } from 'infra/exception/NothingToUpdateError';
import {
  ICreateUser,
  IResponse,
  IUpdateUser,
  IUser,
  IUserRepository,
  IUserService,
} from './interfaces';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async list(): Promise<IResponse<IUser[]>> {
    const response = await this.userRepository.list();

    return {
      data: response,
    };
  }

  public async create(data: ICreateUser): Promise<IResponse<IUser>> {
    await this.verifyUsername(data.username);
    await this.verifyEmail(data.email);

    const response = await this.userRepository.create(data);

    return {
      data: response,
    };
  }

  public async update(
    id: string,
    data: IUpdateUser,
  ): Promise<IResponse<IUser>> {
    if (Object.values(data).every((x) => !x)) {
      throw new NothingToUpdateError();
    }

    if (data.username) {
      await this.verifyUsername(data.username);
    }

    if (data.email) {
      await this.verifyEmail(data.email);
    }

    const response = await this.userRepository.update(id, data);

    return { data: response };
  }

  public async delete(id: string): Promise<IResponse<boolean>> {
    const response = await this.userRepository.delete(id);
    return {
      data: response,
    };
  }

  private async verifyUsername(username: string) {
    const usernameTaken = await this.userRepository.hasUsername(username);
    if (usernameTaken) {
      throw new UsernameTakenError();
    }
  }

  private async verifyEmail(email: string) {
    const emailInUse = await this.userRepository.hasEmail(email);
    if (emailInUse) {
      throw new EmailAlreadyInUseError();
    }
  }
}
