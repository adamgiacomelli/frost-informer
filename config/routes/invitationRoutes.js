module.exports = {

  /**
   * @api {get} /invitation/request
   * @apiName RequestInvitation
   * @apiGroup Invitation
   *
   * @apiParam {String} firstName
   * @apiParam {String} lastName
   * @apiParam {String} email
   *
   * @apiSuccess {Object} Success message
   */
  'POST /v1/invitation/request': {
    controller: 'InvitationController',
    action: 'requestInvitationCode'
  },

  /**
   * @api {get} /invitation/submit
   * @apiName SubmitInvitation
   * @apiGroup Invitation
   *
   * @apiParam {String} code invitation code
   *
   * @apiSuccess {Object} Success message
   */
  'POST /v1/invitation/submit': {
    controller: 'InvitationController',
    action: 'submitInvitation'
  },

};