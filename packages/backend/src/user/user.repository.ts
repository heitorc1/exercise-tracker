import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { hashPassword } from 'helpers/passwordHandler';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.user
      .findMany()
      .then((users) =>
        users.map((user) => ({ _id: user.id, username: user.username })),
      );
  }

  async create(data: CreateUserDTO) {
    const modifiedPassword = await hashPassword(data.password);
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.username,
        password: modifiedPassword,
      },
    });
  }

  async hasUsername(username: string) {
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
