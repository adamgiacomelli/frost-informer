/**
 * User.js
 *
 * @description :: User model associated with users table in the database
 */

module.exports = {

  schema: true,

  attributes: {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    authToken: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    lon: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.STRING
    }
  },
  associations: function () {
  },
  defaultScope: function () {
  },
  options: {
    tableName: 'users',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
