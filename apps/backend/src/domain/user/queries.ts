import { query } from 'infra/db';
import { IUser, IUserQueries } from './interfaces';

export class UserQueries implements IUserQueries {
  private defaultFields = `
    id, 
    username, 
    email, 
    password, 
    created_at as "createdAt", 
    updated_at as "updatedAt"
  `;

  public async find(id: string): Promise<IUser | null> {
    const { rows } = await query<IUser>(
      `SELECT ${this.defaultFields} FROM users WHERE id = $1`,
      [id],
    );
    if (!rows.length) {
      return null;
    }
    return rows[0];
  }

  public async getByUsername(username: string): Promise<IUser | null> {
    const { rows } = await query<IUser>(
      'SELECT id, username, email, password FROM users WHERE username = $1',
      [username],
    );
    if (!rows.length) {
      return null;
    }
    return rows[0];
  }

  public async list(): Promise<IUser[]> {
    const { rows } = await query<IUser>(
      `
        SELECT id, username, email, created_at as "createdAt", updated_at as "updatedAt" 
        FROM users
      `,
    );
    return rows;
  }

  public async create(data: IUser): Promise<IUser> {
    const { rows, rowCount } = await query<IUser>(
      `
          INSERT INTO users
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING ${this.defaultFields}
        `,
      [
        data.id,
        data.username,
        data.password,
        data.email,
        data.createdAt,
        data.updatedAt,
      ],
    );
    if (!rowCount) {
      throw new Error('User not created');
    }
    return rows[0];
  }

  public async hasEmail(email: string): Promise<boolean> {
    const { rows } = await query<{ total: number }>(
      'SELECT COUNT(1) as total FROM users WHERE email = $1',
      [email],
    );
    if (!rows.length) {
      return false;
    }
    return !!Number(rows[0].total);
  }

  public async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const { rows, rowCount } = await query<IUser>(
      `
          UPDATE users 
          SET 
            username = COALESCE($1, username),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            updated_at = $4
          WHERE id = $5
          RETURNING 
            id, 
            username, 
            email, 
            created_at as "createdAt", 
            updated_at as "updatedAt"
        `,
      [data.username, data.email, data.password, data.updatedAt, id],
    );
    if (!rowCount) {
      throw new Error('User not updated');
    }
    return rows[0];
  }

  public async delete(id: string): Promise<boolean> {
    const { rowCount } = await query('DELETE FROM users WHERE id = $1', [id]);
    return rowCount ? true : false;
  }
}
