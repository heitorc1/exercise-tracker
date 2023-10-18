import {
  ExerciseSchema,
  User,
  IUserRepository,
  UserSchema,
  Exercise,
} from './interfaces';
import { hashPassword } from 'helpers/passwordHandler';
import { v4 as uuidv4 } from 'uuid';
import db from 'infra/db';

export class UserRepository implements IUserRepository {
  public async list(): Promise<User[] | null> {
    const users = db
      .prepare('SELECT id, username, email, createdAt, updatedAt FROM users')
      .all();

    if (!users.length) {
      return null;
    }

    return users as User[];
  }

  public async create(data: UserSchema) {
    const id = uuidv4();
    const date = new Date().toISOString();
    const modifiedPassword = await hashPassword(data.password);
    return db
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
      }) as User;
  }

  public async hasUsername(username: string) {
    return !!db
      .prepare('SELECT COUNT(1) FROM users WHERE username = @username')
      .pluck()
      .get({
        username,
      });
  }

  public async hasEmail(email: string) {
    return !!db
      .prepare('SELECT COUNT(1) FROM users WHERE email = @email')
      .pluck()
      .get({
        email,
      });
  }

  public async createExercise(id: string, body: ExerciseSchema) {
    const uuid = uuidv4();
    const date = new Date().toISOString();
    const formattedDate = new Date(body.date).toISOString();

    return db
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
      }) as Exercise;
  }
}
