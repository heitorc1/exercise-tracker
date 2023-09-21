import { UserController } from '../../src/domain/user/controller';
import {
  IUserController,
  IUserRepository,
  IUserService,
} from '../../src/domain/user/interfaces';
import { UserRepository } from '../../src/domain/user/repository';
import { UserService } from '../../src/domain/user/service';
import * as httpMocks from 'node-mocks-http';
import { UsernameTakenError } from '../../src/infra/exception/UsernameTakenError';
import { ZodError } from 'zod';

describe('UserController', () => {
  let repository: IUserRepository;
  let service: IUserService;
  let controller: IUserController;

  beforeEach(() => {
    repository = new UserRepository();
    service = new UserService(repository);
    controller = new UserController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list users', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(service, 'list');

    await controller.list(req, res, next);

    expect(res.statusCode).toBe(200);
  });

  it('should create a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitorc1',
        password: 'teste123',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(service, 'create').mockImplementation();

    await controller.create(req, res, next);

    expect(res.statusCode).toBe(201);
  });

  it('should throw an exception if username already in use', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitorc1',
        password: 'teste123',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(service, 'create').mockRejectedValue(new UsernameTakenError());

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(new UsernameTakenError());
  });

  it('should not create a user without a username', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        password: 'teste123',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(service, 'create');

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user with a username with less than 3 chars', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'ab',
        password: 'teste123',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user with a username with more than 255 chars', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username:
          'test-test-test-test-test-test-test-test-test-test-test-test-test-test-test\
            -test-test-test-test-test-test-test-test-test-test-test-test-test-test-test\
            -test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-\
            test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-',
        password: 'teste123',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user without email', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitor',
        password: 'teste123',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user with an invalid email', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitor',
        password: 'teste123',
        email: 'emailcom',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user without a password', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitor',
        email: 'heitor@gmail.com',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user with a password less than 8 chars', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitor',
        email: 'heitor@gmail.com',
        password: 'teste',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it('should not create a user with a password more than 255 chars', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'heitor',
        email: 'heitor@gmail.com',
        password:
          'test-test-test-test-test-test-test-test-test-test-test-test-test-test-test\
        -test-test-test-test-test-test-test-test-test-test-test-test-test-test-test\
        -test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-\
        test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-test-',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });
});
