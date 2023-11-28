'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('exercises', {
    id: { type: 'string', primaryKey: true, notNull: true },
    description: { type: 'string', notNull: true },
    user_id: { type: 'string', notNull: true },
    duration: { type: 'int', notNull: true },
    date: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true },
    updated_at: { type: 'timestamp', notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable('exercises');
};

exports._meta = {
  version: 1,
};
