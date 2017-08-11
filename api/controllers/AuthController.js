const api = require('instagram-node').instagram();
const redirect_url = 'http://localhost:5050/v1/handle-auth';
api.use({
  client_id: sails.config.auth.IG_CLIENTID,
  client_secret: sails.config.auth.IG_CLIENT_SECRET
});

module.exports = {

  authorizeUser: function (req, res) {
    res.redirect(api.get_authorization_url(redirect_url, {scope: ['likes'], state: 'a state'}));
  },

  handleAuth: function (req, res) {
    api.authorize_user(req.query.code, redirect_url, function (err, result) {
      if (err) {
        console.log(err.body);
      } else {

        let instagramId = result.user.id;
        let token;

        let p_photographer = Photographer.findOne({
          where: {instagramId},
          include: [
            {model: User, as: 'user'}
          ]
        });

        p_photographer.then(photographer => {
          if (photographer) {
            res.status(200).send({
              token: jwToken.issue({id: photographer.userId})
            });
          } else {
            let p_user = User.create({
              username: result.user.username,
              fullname: result.user.full_name,
              status: 'PENDING'
            });
            p_user.then(user => {
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
}
