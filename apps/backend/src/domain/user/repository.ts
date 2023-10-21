import {
  ICreateExercise,
  IUser,
  IUserRepository,
  ICreateUser,
  IExercise,
  IUpdateUser,
} from './interfaces';
import { hashPassword } from 'helpers/passwordHandler';
import { v4 as uuidv4 } from 'uuid';
import type { Database } from 'better-sqlite3';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  public list() {
    const users = this.db
      .prepare('SELECT id, username, email, createdAt, updatedAt FROM users')
      .all();

    if (!users.length) {
      return null;
    }

    return users as IUser[];
  }

  public async create(data: ICreateUser) {
    const id = uuidv4();
    const date = new Date().toISOString();
    const modifiedPassword = await hashPassword(data.password);
    return this.db
      .prepare(
        `
          INSERT INTO users
          VALUES (@id, @username, @password, @email, @createdAt, @updatedAt)
          RETURNING id, username, email, password, createdAt, updatedAt
        `,
      )
      .get({
        id,
        username: data.username,
        password: modifiedPassword,
        email: data.email,
        createdAt: date,
        updatedAt: date,
      }) as IUser;
  }

  public hasUsername(username: string) {
    return !!this.db
      .prepare('SELECT COUNT(1) FROM users WHERE username = @username')
      .pluck()
      .get({
        username,
      });
  }

  public hasEmail(email: string) {
    return !!this.db
      .prepare('SELECT COUNT(1) FROM users WHERE email = @email')
      .pluck()
      .get({
        email,
      });
  }

  public async update(id: string, data: IUpdateUser): Promise<IUser> {
    let modifiedPassword: string | null = null;
    if (data.password) {
      modifiedPassword = await hashPassword(data.password);
    }
    const date = new Date().toISOString();

    return this.db
      .prepare(
        `
          UPDATE users 
          SET 
            username = IFNULL(@username, username),
            email = IFNULL(@email, email),
            password = IFNULL(@password, password),
            updatedAt = @updatedAt
          WHERE id = @id
          RETURNING id, username, email, createdAt, updatedAt
        `,
      )
      .get({
        username: data.username,
        email: data.email,
        password: modifiedPassword,
        updatedAt: date,
        id,
      }) as IUser;
  }

  public createExercise(id: string, body: ICreateExercise) {
    const uuid = uuidv4();
    const date = new Date().toISOString();
    const formattedDate = new Date(body.date).toISOString();

    return this.db
      .prepare(
        `
          INSERT INTO exercises 
          VALUES (@id, @description, @userId, @duration, @date, @createdAt, @updatedAt)
          RETURNING *
        `,
      )
      .get({
        id: uuid,
        description: body.description,
        userId: id,
        duration: body.duration,
        date: formattedDate,
        createdAt: date,
        updatedAt: date,
      }) as IExercise;
  }
}
