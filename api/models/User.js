/**
 * User.js
 *
 * @description :: User model associated with users table in the database
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'localMysqlDB',
  tableName: 'User',
  attributes: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    fullname: {
      type: 'string'
    },
    authToken: {
      type: 'string'
    },
    lat: {
      type: 'float'
    },
    lon: {
      type: 'float'
    },
    
  }

};
