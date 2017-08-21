module.exports = {

  schema: true,

  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  associations: function () {
    PhotographerCategories.belongsTo(Photographer, {
      foreignKey: 'photographerId',
      as: 'categoryIds',
      allowNull: false
    })
  },
  defaultScope: function () {
  },
  options: {
    tableName: 'photographerCategories',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }

};
