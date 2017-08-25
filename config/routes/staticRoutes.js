module.exports = {
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
  }
};