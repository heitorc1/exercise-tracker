import * as jwt from 'jsonwebtoken';
import { APP_KEY } from '@/infra/config';
import { IUser } from '@/domain/user/interfaces';

export class Jwt {
  public sign(data: IUser) {
    const now = Date.now();
    const fourHours = 4 * 60 * 60 * 1000;
    return jwt.sign(
      {
        data,
        iat: now,
        exp: now + fourHours,
      },
      APP_KEY as jwt.Secret,
    );
  }

  public verify(token: string) {
    return jwt.verify(token, APP_KEY as jwt.Secret);
  }
}

const jwtHandler = new Jwt();
export default jwtHandler;
