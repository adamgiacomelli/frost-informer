/**
 * Invite.js
 * @description :: Invitations model
 * */

module.exports = {
  schema: true,

  attributes: {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  },
  associations: function() {},
  defaultScope: function() {},
  options: {
    tableName: 'invitations',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }
};
