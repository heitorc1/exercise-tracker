'use strict';

var dbm;
var type;
var seed;

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
// const { hashPassword } = require('../src/helpers/passwordHandler');

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
  const stmt = [];

  const date = new Date().toISOString();
  const adminUser = {
    id: faker.string.uuid(),
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    email: 'admin@admin.com',
  };

  db.insert(
    'users',
    ['id', 'username', 'password', 'email', 'created_at', 'updated_at'],
    [
      adminUser.id,
      adminUser.username,
      adminUser.password,
      adminUser.email,
      date,
      date,
    ],
  );

  for (let i = 0; i < 120; i++) {
    const exercise = {
      id: faker.string.uuid(),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 30, max: 90 }),
      date: faker.date.recent({ days: 180 }).toISOString(),
    };
    const date = new Date().toISOString();

    stmt.push(
      db.insert(
        'exercises',
        [
          'id',
          'description',
          'user_id',
          'duration',
          'date',
          'created_at',
          'updated_at',
        ],
        [
          exercise.id,
          exercise.description,
          adminUser.id,
          exercise.duration,
          exercise.date,
          date,
          date,
        ],
      ),
    );
  }

  return Promise.all(stmt);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
