import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../../helpers/passwordHandler';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateExerciseDTO } from '../dto/create-exercise.dto';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async list() {
    return this.prisma.user
      .findMany()
      .then((users) =>
        users.map((user) => ({ _id: user.id, username: user.username })),
      );
  }

  public async create(data: CreateUserDTO) {
    const modifiedPassword = await hashPassword(data.password);
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.username,
        password: modifiedPassword,
      },
    });
  }

  public async hasUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  createExercise(id: string, body: CreateExerciseDTO) {
    return this.prisma.exercise.create({
      data: {
        description: body.description,
        duration: body.duration,
        date: body.date,
        user: {
          connect: {
            id,
          },
        },
      },
    });
  }
}

export const userRepository = new UserRepository();
