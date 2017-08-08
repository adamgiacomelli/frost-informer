/**
 * Category.js
 * @description :: Categories model
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: Sequelize.STRING,
    }
  },
  associations: function () {},
  defaultScope: function () {},
  options: {
    tableName: 'Categories',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
