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

const meRoutes = require('./routes/meRoutes');
const invitationRoutes = require('./routes/invitationRoutes');
const authRoutes = require('./routes/authRoutes');
const staticRoutes = require('./routes/staticRoutes');

let otherRoutes = {

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
   * @apiParam {Number} [radius=35] Filter results by radius in km.
   * @apiParam {Number} [followers_min] Filter by minimal number of followers.
   * @apiParam {Number} [followers_max] Filter by maximal number of followers.
   * @apiParam {Boolean} [studio] User studio filter
   * @apiParam {Boolean} [expertise] true for professional and false for amateur
   * @apiParam {String="followers,asc", "followers,desc", "priceRange,asc", "priceRange,desc"} [order] Ordering results by given parameters
   *
   * @apiSuccess {Array} photographer List of results.
   */
  'GET /v1/search': {
    controller: 'SearchController',
    action: 'search',   
  },

  /**
   * @api {get} /categories get categories
   * @apiName GetCategories
   * @apiGroup BasicData
   *
   * @apiSuccess {Array} List of existing categories.
   */
  'GET /v1/categories': {
    controller: 'BasicDataController',
    action: 'getCategories'
  }

};
let routes = {};
Object.assign(routes, ...[otherRoutes, authRoutes, meRoutes, invitationRoutes, staticRoutes]);
module.exports.routes = routes;
