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
      allowNull: true
    },
    lon: {
      type: Sequelize.FLOAT,
      allowNull: false
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
