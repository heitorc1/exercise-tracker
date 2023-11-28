import { query } from 'infra/db';
import { IExercise, IExerciseQueries } from './interfaces';

export class ExerciseQueries implements IExerciseQueries {
  private defaultFields = `
    id, 
    description, 
    user_id as "userId", 
    duration, 
    date, 
    created_at as "createdAt", 
    updated_at as "updatedAt" 
  `;

  public async find(id: string, userId: string): Promise<IExercise | null> {
    const { rows } = await query<IExercise>(
      `
        SELECT ${this.defaultFields}          
        FROM exercises 
        WHERE id = $1 AND user_id = $2
      `,
      [id, userId],
    );
    if (!rows.length) {
      return null;
    }
    return rows[0];
  }

  public async create(data: IExercise): Promise<IExercise> {
    const { rows, rowCount } = await query<IExercise>(
      `
          INSERT INTO exercises 
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING ${this.defaultFields}
        `,
      [
        data.id,
        data.description,
        data.userId,
        data.duration,
        data.date,
        data.createdAt,
        data.updatedAt,
      ],
    );
    if (!rowCount) {
      throw new Error('Exercise not created');
    }
    return rows[0];
  }

  public async list(userId: string): Promise<IExercise[]> {
    const { rows } = await query<IExercise>(
      `SELECT ${this.defaultFields} 
          FROM exercises 
          WHERE user_id = $1 
          ORDER BY date DESC`,
      [userId],
    );
    return rows;
  }

  public async update(
    id: string,
    body: Partial<IExercise>,
  ): Promise<IExercise> {
    const { rows, rowCount } = await query<IExercise>(
      `
      UPDATE exercises
      SET 
        description = COALESCE($1, description),
        duration = COALESCE($2, duration),
        date = COALESCE($3, date),
        updated_at = $4
      WHERE id = $5
      RETURNING ${this.defaultFields}
    `,
      [body.description, body.duration, body.date, body.updatedAt, id],
    );
    if (!rowCount) {
      throw new Error('Exercise not updated');
    }
    return rows[0];
  }

  public async delete(id: string): Promise<boolean> {
    const { rowCount } = await query('DELETE FROM exercises WHERE id = $1', [
      id,
    ]);
    return !!rowCount;
  }
}
