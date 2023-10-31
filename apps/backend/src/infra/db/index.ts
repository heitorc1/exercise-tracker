import * as Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

const db: DatabaseType = new Database('exercise.db');
db.pragma('journal_mode = WAL');

export default db;
