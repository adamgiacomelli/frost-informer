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

  'GET /v1/featured': {
    controller: 'ArtistController',
    action: 'getFeatured',
    swagger: {
      methods: ['GET'],
      summary: 'Get featured artists',
      description: '#####Action: \nCreate a new static page with provided parameters \n#####Returns: \nThe created static page.',
      produces: [
        'application/json'
      ],
      tags: [
        'Featured'
      ],
      responses: {
        '200': {
          description: 'Returns list of featured artists.',
          //schema: 'StaticPage', // api/models/StaticPage.js,
        },
        '400': {
          description: 'Query parameter error.'
        }
      },
      parameters: []
    }
  },

  // search
  'GET /v1/search': {
    controller: 'SearchController',
    action: 'search',
    swagger: {
      methods: ['GET'],
      summary: 'Search artists',
      produces: [
        'application/json'
      ],
      tags: [
        'Featured'
      ],
      responses: {
        '200': {
          description: 'Returns list of artists filtered by given parameters.',
        },
        '400': {
          description: 'Query parameter error.'
        }
      },
      parameters: []
    }
  },

  // static page routes

  'PUT /v1/static-page/': {
    controller: 'StaticPageController',
    action: 'create',
    skipAssets: 'true',
    swagger: {
      methods: ['PUT'],
      summary: 'Create a static page',
      description: '#####Action: \nCreate a new static page with provided parameters \n#####Returns: \nThe created static page.',
      produces: [
        'application/json'
      ],
      tags: [
        'StaticPage'
      ],
      responses: {
        '200': {
          description: 'Returns the new static page',
          schema: 'StaticPage', // api/models/StaticPage.js,
        }
      },
      parameters: []
    }
  },


  'POST /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'update',
    skipAssets: 'true',
    swagger: {
      methods: ['POST'],
      summary: ' Update a static page ',
      description: '#####Action: \nUpdates a static page with the provided parameters \n#####Returns: \nThe updated static page.',
      produces: [
        'application/json'
      ],
      tags: [
        'StaticPage'
      ],
      responses: {
        '200': {
          schema: 'StaticPage', // api/model/StaticPage.js,
        },
      },
      parameters: []
    }
  },

  'GET /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'get',
    skipAssets: 'true',
    swagger: {
      methods: ['GET'],
      summary: ' Get a static page ',
      description: '#####Action: \nGets a static page with the provided id \n#####Returns: \nThe static page.',
      produces: [
        'application/json'
      ],
      tags: [
        'StaticPage'
      ],
      responses: {
        '200': {
          description: 'A static page',
          schema: 'StaticPage', // api/model/StaticPage.js,
        }
      },
      parameters: []
    }
  },

  'DELETE /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'delete',
    skipAssets: 'true',
    swagger: {
      methods: ['DELETE'],
      summary: ' Delete a static page ',
      description: '#####Action: \nDeletes a static page with the provided id.',
      produces: [
        'application/json'
      ],
      tags: [
        'StaticPage'
      ],
      responses: {
        '200': {
          description: 'Page has been successfully deleted **{deleted_id: <id>, result: success}**',
        }
      },
      parameters: []
    }
  },

};
