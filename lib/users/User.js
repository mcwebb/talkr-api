'use strict';

const validator = require('validator');

function User() {
  this._phone = null;
}

User.prototype.setPhone = function (cc, number) {
  // sanitize input and cast to string
  number = validator.whitelist(number + '', '0-9');
  cc = validator.whitelist(cc + '', '0-9');

  // TODO: improve this naive validation
  if (!validator.isLength(cc, {min: 1, max: 3}))
    throw new TypeError('phone cc is not valid');
  // https://en.wikipedia.org/wiki/E.164
  if (!validator.isLength(number, {min: 4, max: 15}))
    throw new TypeError('phone number is not valid');

  this._phone = {
    cc: cc,
    number: number
  };

  return this;
};

User.prototype.getPhone = function () {
  return this._phone;
};

User.prototype.getFormattedPhone = function() {
  if (!this._phone) return null;

  return '+' + this._phone.cc + this._phone.number;
};

module.exports = User;