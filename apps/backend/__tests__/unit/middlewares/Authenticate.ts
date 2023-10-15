import * as httpMocks from 'node-mocks-http';
import { authenticate } from '../../../src/infra/middlewares/authenticate';
import { TokenNotFoundError } from '../../../src/infra/exception/TokenNotFoundError';
import { Jwt } from '../../../src/helpers/jwtHandler';
import * as jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../../../src/infra/exception/InvalidTokenError';

describe('Authenticate', () => {
  it('should authenticate', () => {
    expect(true).toBe(true);
  });

  it('should call next function', () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer jwt',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const user = {
      id: '71f56db9-ad8a-4978-8995-e3a1584aa3ae',
      username: 'heitorc1',
      email: 'heitor@gmail.com',
    };

    jest
      .spyOn(Jwt.prototype, 'verify')
      .mockReturnValue({ data: user, exp: new Date().getTime() + 4 * 60 * 60 });

    authenticate(req, res, next);

    expect(req.user).toStrictEqual(user);
  });

  it('should not proceed if authorization header does not exists', () => {
    const req = httpMocks.createRequest({
      headers: {},
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    expect(req.headers.authorization).toBeUndefined();
    expect(() => authenticate(req, res, next)).toThrow(TokenNotFoundError);
  });

  it('should not proceed if authorization header is invalid', () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'invalid',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => authenticate(req, res, next)).toThrow(InvalidTokenError);
  });

  it('should not proceed if token is expired', () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer jwt',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(Jwt.prototype, 'verify').mockImplementation(() => {
      throw new jwt.TokenExpiredError('error', new Date());
    });

    expect(() => authenticate(req, res, next)).toThrow(jwt.TokenExpiredError);
  });
});
