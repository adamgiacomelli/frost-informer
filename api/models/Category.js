/**
 * Category.js
 * @description :: Categories model
 */

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    Category.hasMany(Photo, {
      foreignKey: {
        name: 'categoryId',
        allowNull: true
      }
    });
    Category.belongsToMany(Photographer, {
      through: PhotographerCategories,
      as: 'categoryPhotographers',
      foreignKey: 'categoryId'
    });
  },
  defaultScope: function() {},
  options: {
    tableName: 'categories',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }
};
