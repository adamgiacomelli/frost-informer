/**
 * Created on 08/08/2017.
 *
 * Category.js
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
