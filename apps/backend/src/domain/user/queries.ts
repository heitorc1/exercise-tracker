import type { Database } from 'better-sqlite3';
import { IExercise, IUser, IUserQueries } from './interfaces';

export class UserQueries implements IUserQueries {
  constructor(private readonly db: Database) {}

  public find(id: string): IUser | undefined {
    return this.db.prepare('SELECT * FROM users WHERE id = @id').get({
      id,
    }) as IUser;
  }

  public getByUsername(username: string): IUser | undefined {
    return this.db
      .prepare(
        'SELECT id, username, email, password FROM users WHERE username = @username',
      )
      .get({ username }) as IUser;
  }

  public list(): IUser[] {
    return this.db
      .prepare('SELECT id, username, email, createdAt, updatedAt FROM users')
      .all() as IUser[];
  }

  public create(data: IUser): IUser {
    return this.db
      .prepare(
        `
          INSERT INTO users
          VALUES (@id, @username, @password, @email, @createdAt, @updatedAt)
          RETURNING id, username, email, password, createdAt, updatedAt
        `,
      )
      .get({
        id: data.id,
        username: data.username,
        email: data.email,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }) as IUser;
  }

  public hasEmail(email: string): boolean {
    return !!this.db
      .prepare('SELECT COUNT(1) FROM users WHERE email = @email')
      .pluck()
      .get({
        email,
      });
  }

  public update(id: string, data: Partial<IUser>): IUser {
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
        password: data.password,
        updatedAt: data.updatedAt,
        id,
      }) as IUser;
  }

  delete(id: string): boolean {
    return !!this.db.prepare('DELETE FROM users WHERE id = @id').run({ id })
      .changes;
  }

  public createExercise(id: string, data: IExercise): IExercise {
    return this.db
      .prepare(
        `
          INSERT INTO exercises 
          VALUES (@id, @description, @userId, @duration, @date, @createdAt, @updatedAt)
          RETURNING *
        `,
      )
      .get({
        id: data.id,
        description: data.description,
        userId: id,
        duration: data.duration,
        date: data.date,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }) as IExercise;
  }
}
