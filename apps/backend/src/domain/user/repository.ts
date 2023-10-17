import prisma from 'infra/prisma';
import {
  ExerciseSchema,
  User,
  IUserRepository,
  UserSchema,
} from './interfaces';
import { hashPassword } from 'helpers/passwordHandler';

export class UserRepository implements IUserRepository {
  public async list(): Promise<Omit<User, 'password'>[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  public async create(data: UserSchema) {
    const modifiedPassword = await hashPassword(data.password);
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: modifiedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  public async hasUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  public async hasEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  public async createExercise(id: string, body: ExerciseSchema) {
    return prisma.exercise.create({
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
