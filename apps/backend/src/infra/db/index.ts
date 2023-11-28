/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { DB_DATABASE, DB_PASSWORD, DB_USER } from 'infra/config';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});

export const query = <T extends QueryResultRow = any>(
  text: string,
  params?: any,
): Promise<QueryResult<T>> => pool.query<T>(text, params);
