'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const db = require('./lib/util/db');

const server = new Hapi.Server({ debug: { request: ['error'] }});
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'POST',
  path: '/api/user',
  handler: require('./lib/users/handlers').create,
  config: {
    payload: {
      output: 'data',
      parse: true,
      allow: 'application/json'
    },
    validate: {
      payload: {
        phone: Joi.object().keys({
          cc: Joi.string().min(1).max(3),
          number: Joi.string().min(4).max(16)
        })
      }
    }
  }
});

server.start(function (err) {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});

server.on('stop', function () {
  db.done();
});