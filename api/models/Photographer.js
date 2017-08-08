/**
 * Created on 08/08/2017.
 *
 * Photographer.js
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
    tableName: 'Photographer_options',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
