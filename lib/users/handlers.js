'use strict';

const manager = require('./manager');
const User = require('./User');

function handleUserCreation(request, reply) {
  var response, user = new User();
  user.setPhone(
    request.payload.phone.cc,
    request.payload.phone.number
  );

  manager.create(user).then(function (result) {
    response = reply(result).code(201);
  }, function (err) {
    response = reply(err);
  });

  return response;
}

module.exports = {
  create: handleUserCreation
};