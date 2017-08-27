module.exports = {

  /**
   * @api {get} /featured Request featured photographers
   * @apiName GetFeatured
   * @apiGroup Featured
   *
   * @apiParam {Number} page Which page of results to return.
   * @apiParam {Number} results_per_page How many results per page.
   *
   * @apiSuccess {Array} photographer List of featured artists.
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