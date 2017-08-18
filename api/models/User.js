/**
 * User.js
 *
 * @description :: User model associated with users table in the database
 */

module.exports = {

  schema: true,

  attributes: {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    authToken: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DOUBLE
    },
    lon: {
      type: Sequelize.DOUBLE
    },
    status: {
      type: Sequelize.STRING
    }
  },
  associations: function () {
    User.hasOne(Photographer, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
        as: 'photographer'
      }
    })
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
