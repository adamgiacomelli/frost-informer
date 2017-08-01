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

  'PUT /v1/static-page': {
    controller: 'StaticPageController',
    action: 'create',
    skipAssets: 'true',
    swagger: {
      summary: 'Create a static page',
      description: 'Create a new static page with provided parameters',
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

  'POST /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'update',
    skipAssets: 'true',
    swagger: {
      methods: ['POST'],
      summary: ' Update a static page ',
      description: 'Update a static page with new parameters',
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
      parameters: [
        'StaticPage' // api/model/StaticPage.js
      ]
    }
  },

  'GET /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'get',
    skipAssets: 'true',
    swagger: {
      methods: ['GET'],
      summary: ' Get a static page ',
      description: 'Get a single static page',
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
      parameters: [
        'StaticPage' // api/model/StaticPage.js
      ]
    }
  },

  'DELETE /v1/static-page/:id': {
    controller: 'StaticPageController',
    action: 'delete',
    skipAssets: 'true',
    swagger: {
      methods: ['DELETE'],
      summary: ' Delete a static page ',
      description: 'Delete a single static page',
      produces: [
        'application/json'
      ],
      tags: [
        'Static Page MEOW'
      ],
      responses: {
        '200': {
          description: 'A static page',
          schema: 'StaticPage', // api/model/StaticPage.js,
        }
      },
      parameters: [
        'StaticPage' // api/model/StaticPage.js
      ]
    }
  },
};
