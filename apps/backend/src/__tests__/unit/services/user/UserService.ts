import { IUserRepository, IUserService } from 'domain/user/interfaces';
import { UserRepository } from 'domain/user/repository';
import { UserService } from 'domain/user/service';
import { EmailAlreadyInUseError } from 'infra/exception/EmailAlreadyInUseError';
import { UsernameTakenError } from 'infra/exception/UsernameTakenError';

const userList = [
  {
    id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
    username: 'heitorc1',
    email: 'heitorc1@gmail.com',
  },
  {
    id: 'a4ddb39d-90f2-41b0-b3da-35118f4bf969',
    username: 'user',
    email: 'user@gmail.com',
  },
];

describe('UserService', () => {
  let repository: IUserRepository;
  let service: IUserService;

  beforeEach(() => {
    repository = new UserRepository();
    service = new UserService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list users', async () => {
    jest.spyOn(UserRepository.prototype, 'list').mockResolvedValue(userList);

    const response = await service.list();

    expect(response).toStrictEqual({ data: userList });
  });

  it('should create a user', async () => {
    const data = {
      username: 'heitorc1',
      password: 'teste',
      email: 'heitor@gmail.com',
    };

    jest
      .spyOn(UserRepository.prototype, 'hasUsername')
      .mockResolvedValue(false);
    jest.spyOn(UserRepository.prototype, 'hasEmail').mockResolvedValue(false);
    jest.spyOn(UserRepository.prototype, 'create').mockResolvedValue({
      id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
      username: 'heitorc1',
      email: 'heitor@gmail.com',
    });

    const response = await service.create(data);

    expect(response).toStrictEqual({
      data: {
        id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
        username: 'heitorc1',
        email: 'heitor@gmail.com',
      },
    });
  });

  it('should not create a new user with a username in use', () => {
    const data = {
      username: 'heitorc1',
      email: 'heitor@gmail.com',
      password: 'teste',
    };
    jest.spyOn(UserRepository.prototype, 'hasUsername').mockResolvedValue(true);

    expect(service.create(data)).rejects.toThrowError(UsernameTakenError);
  });

  it('should not create a new user with a email in use', () => {
    const data = {
      username: 'heitorc1',
      email: 'heitor@gmail.com',
      password: 'teste',
    };
    jest
      .spyOn(UserRepository.prototype, 'hasUsername')
      .mockResolvedValue(false);
    jest.spyOn(UserRepository.prototype, 'hasEmail').mockResolvedValue(true);

    expect(service.create(data)).rejects.toThrowError(EmailAlreadyInUseError);
  });
});
