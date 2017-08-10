const api = require('instagram-node').instagram();
const redirect_url = 'http://localhost:5050/v1/handle-auth';
api.use({
  client_id: '68546bcfaf2c47dd934fdc3ef3f936d8',
  client_secret: '093508203e2c4f93a0d8f4594ffde329'
});

module.exports = {

  authorizeUser: function (req, res) {
    res.redirect(api.get_authorization_url(redirect_url, {scope: ['likes'], state: 'a state'}));
  },

  handleAuth: function (req, res) {
    api.authorize_user(req.query.code, redirect_url, function (err, result) {
      if (err) {
        console.log(err.body);
        res.send("Didn't work");
      } else {
        console.log(result);
        console.log('Yay! Access token is ' + result.access_token);

        let access_token = result.access_token;


        res.send('You made it!!');
      }
    });
  }
}
