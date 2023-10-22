import type { Database } from 'better-sqlite3';
import { IExercise, IExerciseQueries } from './interfaces';

export class ExerciseQueries implements IExerciseQueries {
  constructor(private readonly db: Database) {}

  public find(id: string, userId: string): IExercise | undefined {
    return this.db
      .prepare(
        `
        SELECT * FROM exercises 
        WHERE id = @id AND userId = @userId
      `,
      )
      .get({ id, userId }) as IExercise;
  }

  public create(data: IExercise): IExercise {
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
        userId: data.userId,
        duration: data.duration,
        date: data.date,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }) as IExercise;
  }

  public list(userId: string): IExercise[] {
    return this.db
      .prepare('SELECT * FROM exercises WHERE userId = @userId')
      .all({ userId }) as IExercise[];
  }

  public update(id: string, body: Partial<IExercise>): IExercise {
    return this.db
      .prepare(
        `
      UPDATE exercises
      SET 
        description = IFNULL(@description, description),
        duration = IFNULL(@duration, duration),
        date = IFNULL(@date, date),
        updatedAT = @updatedAt
      WHERE id = @id
      RETURNING *
    `,
      )
      .get({
        description: body.description,
        duration: body.duration,
        date: body.date,
        updatedAt: body.updatedAt,
        id,
      }) as IExercise;
  }

  public delete(id: string): boolean {
    return !!this.db.prepare('DELETE FROM exercises WHERE id = @id').run({ id })
      .changes;
  }

  public findFirst(): IExercise {
    return this.db
      .prepare(
        `
          SELECT * FROM exercises
          LIMIT 1
        `,
      )
      .get() as IExercise;
  }
}
