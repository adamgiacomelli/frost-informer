module.exports = {

  'GET /v1/authorize-user': {
    controller: 'AuthController',
    action: 'authorizeUser',
  },

  'GET /v1/handle-auth': {
    controller: 'AuthController',
    action: 'handleAuth'
  }

};