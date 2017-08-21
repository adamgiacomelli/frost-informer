const api = require('instagram-node').instagram();
const {redirectUrl} = sails.config;
api.use({
  client_id: sails.config.auth.IG_CLIENTID,
  client_secret: sails.config.auth.IG_CLIENT_SECRET
});

module.exports = {

  authorizeUser: function (req, res) {
    res.redirect(api.get_authorization_url(redirectUrl, {scope: ['likes'], state: 'a state'}));
  },

  handleAuth: function (req, res) {
    api.authorize_user(req.query.code, redirectUrl, function (err, result) {
      if (err) {
        console.log(err.body);
      } else {
        let instagramId = result.user.id;
        let token;

        let pPhotographer = Photographer.findOne({
          where: {instagramId},
          include: [
            {model: User, as: 'user'}
          ]
        });

        pPhotographer.then(photographer => {
          if (photographer) {
            res.status(200).send({
              token: jwToken.issue({id: photographer.userId})
            });
          } else {
            let pUser = User.create({
              username: result.user.username,
              fullname: result.user.full_name,
              status: 'PENDING'
            });
            pUser.then(user => {
              if (user) {
                Photographer.create({
                  instagramId,
                  userId: user.id
                }).then(newPhotographer => {
                  res.status(200).send({
                    token: jwToken.issue({id: newPhotographer.userId})
                  })
                });
              }
            });
          }
        });
      }
    });
  }
};
