module.exports = {

  'POST /v1/invitation/request': {
    controller: 'InvitationController',
    action: 'requestInvitationCode'
  },

  'POST /v1/invitation/submit': {
    controller: 'InvitationController',
    action: 'submitInvitation'
  },

};