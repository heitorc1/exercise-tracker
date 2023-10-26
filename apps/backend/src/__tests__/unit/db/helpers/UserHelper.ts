import { faker } from '@faker-js/faker';
import { IUserQueries } from 'domain/user/interfaces';
import { hashPassword } from 'helpers/passwordHandler';
import { UserQueries } from 'domain/user/queries';
import unitTestDb from '..';

class UserHelper {
  constructor(private readonly userQueries: IUserQueries) {}

  public getUser() {
    return this.userQueries.findFirst();
  }

  public async insertUser(username: string, password: string) {
    const id = faker.string.uuid();
    const email = faker.internet.email();
    const modifiedPassword = await hashPassword(password);

    const date = new Date().toISOString();

    return this.userQueries.create({
      id,
      username: username,
      password: modifiedPassword,
      email: email,
      createdAt: date,
      updatedAt: date,
    });
  }
}

const userQueries = new UserQueries(unitTestDb);
const userHelper = new UserHelper(userQueries);
export default userHelper;
