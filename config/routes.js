/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /**
   * @api {get} /featured Request featured photographers
   * @apiName GetFeatured
   * @apiGroup Featured
   *   
   * @apiParam {Number} page Which page of results to return.
   * @apiParam {Number} results_per_page How many results per page.
   *
   * @apiSuccess {Array} photographer List of featured artists.
   */
  'GET /v1/featured': {
    controller: 'PhotographerController',
    action: 'getFeatured'  
  },

  /**
   * @api {get} /search Search photographers
   * @apiName Search
   * @apiGroup Search
   *   
   * @apiParam {Number} lat Lattitude.
   * @apiParam {Number} lon Longitude.
   * @apiParam {Number} [page=1] Which page of results to return.
   * @apiParam {Number} [results_per_page=10] How many results per page.
   * @apiParam {Number} [category] CategoryId.
   * @apiParam {Number} [radius] Filter results by radius in km.
   * @apiParam {Number} [followers_min] Filter by minimal number of followers.
   * @apiParam {Number} [followers_max] Filter by maximal number of followers.
   *
   * @apiSuccess {Array} photographer List of results.
   */
  'GET /v1/search': {
    controller: 'SearchController',
    action: 'search',   
  },

  // static page
  'PUT /v1/static-page/': {
    controller: 'StaticPageController',
    action: 'create',
    skipAssets: 'true',
  },


  'POST /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'update',
    skipAssets: 'true',
  },

  'GET /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'get',
    skipAssets: 'true',
  },

  'DELETE /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'delete',
    skipAssets: 'true',
  },

  // authentication
  'GET /v1/authorize-user': {
    controller: 'AuthController',
    action: 'authorizeUser',
  },

  'GET /v1/handle-auth': {
    controller: 'AuthController',
    action: 'handleAuth'
  },

  // invitations
  'POST /v1/invitation/request': {
    controller: 'InvitationController',
    action: 'requestInvitationCode'
  },

  'POST /v1/invitation/submit': {
    controller: 'InvitationController',
    action: 'submitInvitation'
  },

  /**
   * @api {get} /me Get basic information for logged in user
   * @apiName Get basic user information
   * @apiGroup User
   *
   * @apiHeader {String} authorization JW token.
   *
   * @apiSuccess {Object} Current user basic data.
   */
  'GET /v1/me': {
    controller: 'PhotographerController',
    action: 'getBasicInfo'
  },

  /**
   * @api {put} /me Update basic information for logged in user
   * @apiName Update basic user information
   * @apiGroup User
   *
   * @apiHeader {String} authorization JW token.
   *
   * @apiSuccess {Object} Current user basic data.
   * */
  'PUT /v1/me': {
    controller: 'PhotographerController',
    action: 'updateBasicInfo'
  }

};
