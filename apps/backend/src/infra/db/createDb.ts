import { Database } from 'better-sqlite3';

export function createDb(db: Database) {
  db.prepare(
    `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )`,
  ).run();

  db.prepare(
    `
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY NOT NULL,
        description TEXT NOT NULL,
        userId TEXT NOT NULL,
        duration INTEGER NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
      
      `,
  ).run();
}
