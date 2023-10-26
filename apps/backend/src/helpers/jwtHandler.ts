import * as jwt from 'jsonwebtoken';
import { IUser } from 'domain/user/interfaces';
import { APP_KEY } from 'infra/config';

export class Jwt {
  public sign(data: IUser) {
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
