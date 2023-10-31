module.exports = async function () {
  const dbmigrate = require('db-migrate');
  const dbm = dbmigrate.getInstance(true);
  dbm.up().then(function () {
    console.log('successfully migrated');
    return;
  });
};
