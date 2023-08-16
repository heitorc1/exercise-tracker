import { PrismaClient } from '@prisma/client';
import { ICreateExercise, ICreateUser } from './interfaces';
import { hashPassword } from '../../../helpers/passwordHandler';

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

  public async create(data: ICreateUser) {
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

  createExercise(id: string, body: ICreateExercise) {
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
