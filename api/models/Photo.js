/**
 * Created on 08/08/2017.
 *
 * Photo.js
 */

module.exports = {

  schema: true,

  attributes: {
    instagramImageId: {
      type: Sequelize.STRING,
    }
  },
  associations: function () {
    Photo.belongsTo(Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      }
    });
    Photo.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  },
  defaultScope: function () {},
  options: {
    tableName: 'Photos',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
