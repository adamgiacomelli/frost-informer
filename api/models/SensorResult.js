module.exports = {
  schema: true,

  attributes: {
    temperature: {
      type: Sequelize.DOUBLE
    },
    humidity: {
      type: Sequelize.DOUBLE
    },
    createdAt: {
      type: Sequelize.DATE
    },
    deviceId: {
      type: Sequelize.STRING
    },
  },
  associations: function() {},
  defaultScope: function() {},
  options: {
    tableName: 'sensorresult',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {}
  }
};
