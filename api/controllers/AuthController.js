const api = require('instagram-node').instagram();
const { redirectUrl } = sails.config;
api.use({
  client_id: sails.config.auth.IG_CLIENTID,
  client_secret: sails.config.auth.IG_CLIENT_SECRET
});

module.exports = {
  authorizeUser: function(req, res) {
    res.redirect(api.get_authorization_url(redirectUrl));
  },

  handleAuth: function(req, res) {
    api.authorize_user(req.query.code, redirectUrl, function(err, result) {
      if (err) {
        console.log(err.body);
      } else {
        let instagramId = result.user.id;
        let name = result.user.full_name.split(' ');
        let firstName = name[0];
        name.shift();
        let lastName = name.join(' ');
        let token;

        let pPhotographer = Photographer.findOne({
          where: { instagramId },
          include: [{ model: User, as: 'user' }]
        });

        pPhotographer.then(photographer => {
          if (photographer) {
            token = jwToken.issue({ id: photographer.userId });
            User.update(
              {
                authToken: token
              },
              { where: { id: photographer.userId } }
            )
              .then(result => {
                res.status(200).send({
                  token
                });
              })
              .catch(err => {
                res.status(400).send({ message: 'Error updating auth token.' });
              });
          } else {
            let pUser = User.create({
              username: result.user.username,
              status: 'PENDING',
              firstName,
              lastName
            });
            pUser.then(user => {
              if (user) {
                token = jwToken.issue({ id: user.id });
                user.update({ authToken: token });
                Photographer.create({
                  instagramId,
                  userId: user.id
                }).then(newPhotographer => {
                  res.status(200).send({
                    token
                  });
                });
              }
            });
          }
        });
      }
    });
  }
};
