import * as Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

const unitTestDb: DatabaseType = new Database(
  'src/__tests__/unit/db/unit-testing.db',
);
unitTestDb.pragma('journal_mode = WAL');

export default unitTestDb;
