/**
 * Photographer.js
 * @description :: Photographer options connected with User model
 */

module.exports = {

  schema: true,

  attributes: {
    studio: {
      type: Sequelize.BOOLEAN,
    },
    expertise: {
      type: Sequelize.STRING,
    },
    priceRange: {
      type: Sequelize.INTEGER,
    },
    instagramToken: {
      type: Sequelize.STRING,
    },
    instagramId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  associations: function () {
    Photographer.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })
  },
  defaultScope: function () {
  },
  options: {
    tableName: 'photographer_options',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
