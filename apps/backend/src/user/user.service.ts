import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsernameTakenException } from 'src/exception/username-taken.exception';
import { CreateExerciseDTO } from './dto/create-exercise.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list() {
    return this.repository.list();
  }

  async create(data: CreateUserDTO) {
    const usernameTaken = await this.repository.hasUsername(data.username);
    if (usernameTaken) {
      throw new UsernameTakenException();
    }

    return this.repository.create(data);
  }

  async createExercise(id: string, body: CreateExerciseDTO) {
    return this.repository.createExercise(id, body);
  }
}