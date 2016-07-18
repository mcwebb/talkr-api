'use strict';

const connection = require('../util/db').connection;

function UserManager() {

}

UserManager.prototype.create = function(user) {
  return connection.then(function (client) {
    var deferred = new Promise(function (resolve, reject) {
      client.query({
        text: "INSERT INTO users(phone_cc, phone_number) VALUES ($1, $2)",
        values: [user.getPhone().cc, user.getPhone().number]
      }, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return deferred.promise;
  });
};

module.exports = new UserManager();