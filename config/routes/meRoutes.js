module.exports = {

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

  /** @api {put} /me Update basic information for logged in user
   * @apiName Update basic user information
   * @apiGroup User
   *
   * @apiHeader {String} authorization JW token.
   * @apiParam {String} firstName User first name
   * @apiParam {String} lastName User last name
   * @apiParam {Number} lat latitude
   * @apiParam {Number} lon longitude
   * @apiParam {String} email User email
   * @apiParam {String="amateur","professional"} expertise
   * @apiParam {Boolean} studio
   * @apiParam {Number} priceRange Price range 1-5
   * @apiParam {Array} categories Array of category ids (Example: [1, 2])
   *
   * @apiSuccess {Object} Current user basic data.
   * */
  'PUT /v1/me': {
    controller: 'PhotographerController',
    action: 'updateBasicInfo'
  },

  /**
   * @api {get} /me/most-liked Get 33 of the most liked user photos
   * @apiName Most liked photos
   * @apiGroup User
   * @apiDescription This endpoint only returns 20 photos at the moment due to application not being reviewed by instagram wizards yet.
   *
   * @apiHeader {String} authorization JW token.
   *
   * @apiSuccess {Object[]} Array of objects with attributes: id and photo (url)
   * */
  'GET /v1/me/most-liked': {
    controller: 'PhotographerController',
    action: 'instagramMostLiked'
  },

  /**
   * @api {post} /me/update-photos
   * @apiName Update photos for logged in user
   * @apiGroup User
   * @apiDescription Endpoint updates photographers photos
   *
   * @apiHeader {String} authorization JW token.
   * @apiParam {String[]} photos array of instagram ids
   * @apiParamExample {json} Request-Example:
   *    {
   *      "photos": ['1231231231', '123123123123123']
   *    }
   *
   * @apiSuccess {Object} Success message
   *
   * */
  'POST /v1/me/update-photos': {
    controller: 'PhotographerController',
    action: 'updatePhotos'
  },

  /**
   * @api {put} /me/update-photo-category
   * @apiName Update photo's category
   * @apiGroup User
   *
   * @apiHeader {String} authorization JW token
   * @apiParam {Object} photo Array of objects with photoId - categoryId pairs
   * @apiParamExample {json} Request-Example:
   *    {
   *      "photoId": "109",
   *      "categoryId": "1"
   *    }
   *
   * @apiSuccess {Object} Success message
   * */
  'PUT /v1/me/update-photo-category': {
    controller: 'PhotographerController',
    action: 'updatePhotoCategory'
  }

}