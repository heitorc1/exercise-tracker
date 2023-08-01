import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { UsernameTakenException } from 'src/exception/username-taken.exception';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list users', async () => {
    const users = [
      {
        _id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
        username: 'heitorc1',
      },
      {
        _id: 'a4ddb39d-90f2-41b0-b3da-35118f4bf969',
        username: 'user',
      },
    ];
    jest.spyOn(service, 'list').mockResolvedValue(users);

    const response = await service.list();

    expect(response).toStrictEqual(users);
  });

  it('should create a new user', async () => {
    const data = {
      username: 'heitorc1',
    };
    const createdUser = {
      username: 'heitorc1',
      _id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createdUser);

    const response = await controller.create(data);

    expect(response).toBe(createdUser);
  });

  it('should throw an exception if username already in use', async () => {
    const data = {
      username: 'heitorc1',
    };
    const createdUser = {
      username: 'heitorc1',
      _id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
    };
    jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(createdUser)
      .mockRejectedValue(new UsernameTakenException());

    await controller.create(data);
    expect(controller.create(data)).rejects.toThrowError(
      UsernameTakenException,
    );
  });
});
