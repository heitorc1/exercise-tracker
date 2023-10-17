import { User } from 'domain/user/interfaces';
import { APP_KEY } from 'infra/config';
import * as jwt from 'jsonwebtoken';

export class Jwt {
  public sign(data: User) {
    return jwt.sign({ data }, APP_KEY as jwt.Secret, {
      expiresIn: '4h',
    });
  }

  public verify(token: string) {
    return jwt.verify(token, APP_KEY as jwt.Secret);
  }
}

const jwtHandler = new Jwt();
export default jwtHandler;
