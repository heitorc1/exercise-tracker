import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { UsernameTakenException } from 'src/exception/username-taken.exception';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const data = {
      username: 'heitorc1',
    };
    jest.spyOn(repository, 'hasUsername').mockResolvedValue(false);
    jest.spyOn(repository, 'create').mockResolvedValue({
      id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
      username: 'heitorc1',
      createdAt: new Date('2023-07-31 21:00'),
      updatedAt: new Date('2023-07-31 21:00'),
    });

    const response = await service.create(data);

    expect(response).toStrictEqual({
      _id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
      username: 'heitorc1',
    });
  });

  it('should not create a new user with a username in use', () => {
    const data = {
      username: 'heitorc1',
    };
    jest.spyOn(repository, 'hasUsername').mockResolvedValue(true);

    expect(service.create(data)).rejects.toThrowError(UsernameTakenException);
  });
});
