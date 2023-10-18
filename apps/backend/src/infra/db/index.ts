import * as Database from 'better-sqlite3';
import { createDb } from './createDb';

const db = new Database('exercise.db');

createDb(db);

export default db;
