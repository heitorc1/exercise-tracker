import { faker } from '@faker-js/faker';
import type { Database } from 'better-sqlite3';
import { hashPassword } from 'helpers/passwordHandler';

export async function seed(db: Database) {
  for (let i = 0; i < 10; i++) {
    const date = new Date().toISOString();
    const user = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    db.prepare(
      `
      INSERT INTO users
      VALUES (@id, @username, @password, @email, @createdAt, @updatedAt)
    `,
    ).run({
      id: user.id,
      username: user.username,
      password: await hashPassword(user.password),
      email: user.email,
      createdAt: date,
      updatedAt: date,
    });
  }
}
