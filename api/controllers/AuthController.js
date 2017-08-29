const api = require('instagram-node').instagram();
const { redirectUrl } = sails.config;
api.use({
  client_id: sails.config.auth.IG_CLIENTID,
  client_secret: sails.config.auth.IG_CLIENT_SECRET
});

module.exports = {
  authorizeUser: function(req, res) {
    let redirect = api.get_authorization_url(redirectUrl, {
      scope: ['public_content', 'basic']
    });
    res.status(200).send({ redirectUrl: redirect });
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
            photographer.updateAttributes({
              instagramToken: result.access_token
            });
            User.update(
              {
                authToken: token
              },
              { where: { id: photographer.userId } }
            )
              .then(result => {
                res.redirect(
                  `https://d3j4y9hlryww28.cloudfront.net/authorize-user?token=${token}`
                );
              })
              .catch(err => {
                res.status(400).send({ message: 'Error updating auth token.' });
              });
          } else {
            let pUser = User.create({
              username: result.user.username,
              status: 'PENDING',
              avatar: result.user.profile_picture,
              firstName,
              lastName
            });
            pUser.then(user => {
              if (user) {
                token = jwToken.issue({ id: user.id });
                user.update({ authToken: token });

                instagramApiService
                  .getUser(instagramId, result.access_token)
                  .then(instagramUser => {
                    Photographer.create({
                      instagramId,
                      userId: user.id,
                      instagramToken: result.access_token,
                      followers: instagramUser.counts.follows
                    }).then(newPhotographer => {
                      res.redirect(
                        `https://d3j4y9hlryww28.cloudfront.net/authorize-user?token=${token}`
                      );
                    });
                  })
                  .catch(err => {
                    res
                      .status(400)
                      .send({
                        message: 'Error fetching and updating user data',
                        err
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
