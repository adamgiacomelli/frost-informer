/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
  let token;

  // check for headers & parameters
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.param('token')) {
    token = req.param('token');
    delete req.query.token;
  } else {
    return res.json(401, { err: 'No Authorization header was found' });
  }

  // verify token
  jwToken.verify(token, function(err, token) {
    if (err) return res.json(401, { err: 'Invalid Token!' });
    req.token = token;
    next();
  });
};
