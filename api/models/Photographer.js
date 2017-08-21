/**
 * Photographer.js
 * @description :: Photographer options connected with User model
 */

module.exports = {
  schema: true,

  attributes: {
    studio: {
      type: Sequelize.BOOLEAN
    },
    expertise: {
      type: Sequelize.STRING
    },
    priceRange: {
      type: Sequelize.INTEGER
    },
    followers: {
      type: Sequelize.BIGINT
    },
    instagramToken: {
      type: Sequelize.STRING
    },
    instagramId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  associations: function() {
    Photographer.belongsTo(User, {
      as: 'user',
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    Photographer.hasMany(Photo, {
      as: 'photos',
      foreignKey: {
        name: 'photographerId',
        allowNull: false
      }
    });
    Photographer.belongsToMany(Category, {
      through: PhotographerCategories,
      as: 'categories',
      foreignKey: 'photographerId'
    });
    Photographer.hasMany(PhotographerCategories, {
      foreignKey: {
        name: 'photographerId',
        allowNull: false
      },
      as: 'categoryIds'
    });
  },
  defaultScope: function() {},
  options: {
    tableName: 'photographers',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }
};
