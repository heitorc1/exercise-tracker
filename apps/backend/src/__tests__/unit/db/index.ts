import * as Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';
import { createDb } from 'infra/db/createDb';
import { seed } from './seed';

const unitTestDb: DatabaseType = new Database(
  'src/__tests__/unit/db/unit-testing.db',
);
unitTestDb.pragma('journal_mode = WAL');

createDb(unitTestDb);

const hasUsers = unitTestDb.prepare('SELECT COUNT(1) FROM users').pluck().get();

if (!hasUsers) {
  seed(unitTestDb);
}

export default unitTestDb;
