import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

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
    return this.prisma.user.create({
      data: {
        username: data.username,
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
}
