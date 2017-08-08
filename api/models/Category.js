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
    tableName: 'categories',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
