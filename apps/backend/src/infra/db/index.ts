import SqlDatabase from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

const db: DatabaseType = new SqlDatabase('exercise.db');
db.pragma('journal_mode = WAL');

export default db;
