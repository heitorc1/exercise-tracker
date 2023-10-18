import { faker } from '@faker-js/faker';
import unitTestDb from '..';
import { IUser } from 'domain/user/interfaces';
import { hashPassword } from 'helpers/passwordHandler';

export async function insertUser(username: string, password: string) {
  const id = faker.string.uuid();
  const email = faker.internet.email();
  const modifiedPassword = await hashPassword(password);

  const date = new Date().toISOString();

  return unitTestDb
    .prepare(
      `
        INSERT INTO users
        VALUES (@id, @username, @password, @email, @createdAt, @updatedAt)
        RETURNING *
      `,
    )
    .get({
      id,
      username: username,
      password: modifiedPassword,
      email: email,
      createdAt: date,
      updatedAt: date,
    }) as IUser;
}
