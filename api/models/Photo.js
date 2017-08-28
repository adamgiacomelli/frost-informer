/**
 * Photo.js
 * @description :: Photo model
 */

module.exports = {
  schema: true,

  attributes: {
    instagramImageId: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
    hiresPhoto: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    Photo.belongsTo(Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: true
      }
    });
    Photo.belongsTo(Photographer, {
      foreignKey: {
        name: 'photographerId',
        allowNull: false
      }
    });
  },
  defaultScope: function() {},
  options: {
    tableName: 'photos',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }
};
