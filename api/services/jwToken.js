/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken');
const tokenSecret = sails.config.auth.TOKEN_SECRET;

module.exports = {
  issue: payload => {
    return jwt.sign(payload, tokenSecret);
  },
  verify: (token, callback) => {
    return jwt.verify(token, tokenSecret, {}, callback);
  }
};
