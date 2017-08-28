module.exports = {

  /**
   * @api {get} /authorize
   * @apiName Authentication
   * @apiGroup Authentication
   *
   * @apiSuccess {Object} property redirectUrl contains redirectUrl
   * */
  'GET /v1/authorize-user': {
    controller: 'AuthController',
    action: 'authorizeUser',
  },

  'GET /v1/handle-auth': {
    controller: 'AuthController',
    action: 'handleAuth'
  }

};