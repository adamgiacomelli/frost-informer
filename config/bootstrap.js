/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

const _ = require('lodash');

module.exports.bootstrap = function(cb) {

  const NUMBER_OF_USERS = 100;

  // seed database with users
  if(process.env.NODE_ENV !== 'development')
    return cb();

  // create two sample categories
  let categories = [];
  Category.create(seederHelpers.generateCategory('People & Lifestyle'));
  Category.create(seederHelpers.generateCategory('Editorial & Documentary'));

  let pUsers = [];
  // create multiple users
  for (let i=0; i<NUMBER_OF_USERS; i++) {
    pUsers.push(User.create(seederHelpers.generateUser()));
  }

  // generate photographers and 9 sample photos per photographer
  let pPhotographers = [];
  Promise.all(pUsers)
    .then(users => {
      // create photographers
      _.map(users, user => {
          pPhotographers.push(Photographer.create(seederHelpers.generatePhotographer(user.id)));
        });

      Promise.all(pPhotographers)
        .then(photographers => {
          // generate 9 photos per user
          _.map(photographers, photographer => {
            for (let i=0; i<9; i++) {
              Photo.create(seederHelpers.generatePhoto(photographer, Math.floor(Math.random() * 2) + 1))
            }
          })
        });
    });


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
