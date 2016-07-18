'use strict';

const pg = require('pg');

// pg config set by env vars
const pool = new pg.Pool();
var db = {};

db.connection = new Promise(function (resolve, reject) {
  pool.connect(function (err, client, done) {
    if (err) reject(err);

    db.done = done;
    resolve(client);
  })
});

module.exports = db;