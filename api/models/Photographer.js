/**
 * Photographer.js
 *
 * @description :: Model filled with photographer options, connected with User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {

  connection: 'localMysqlDB',
  tableName: 'Photographer_options',
  attributes: {
    studio: {
      type: 'boolean'
    },
    expertise: {
      type: 'string'
    },
    priceRange: {
      type: 'integer'
    },
    instagramToken: {
      type: 'string'
    },
    userId: {
      model: 'user'
    }
  }

};
