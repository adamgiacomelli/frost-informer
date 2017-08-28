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
  const POPULATE = true;

  // seed database with users
  if(process.env.NODE_ENV !== 'development')
    return cb();

  // create two sample categories
  if (POPULATE) {
    let pCategories = [];
    pCategories.push(Category.create(seederHelpers.generateCategory('People & Lifestyle')));
    pCategories.push(Category.create(seederHelpers.generateCategory('Editorial & Documentary')));
    pCategories.push(Category.create(seederHelpers.generateCategory('Sports & Transportation')));
    pCategories.push(Category.create(seederHelpers.generateCategory('Architecture & Interior')));
    pCategories.push(Category.create(seederHelpers.generateCategory('Business & Corporate')));

    let pUsers = [];
    // create multiple users
    for (let i = 0; i < NUMBER_OF_USERS; i++) {
      pUsers.push(User.create(seederHelpers.generateUser()));
    }

    Promise.all(pCategories)
      .then(categories => {

        let pPhotographers = [];
        Promise.all(pUsers)
          .then(users => {
            _.map(users, user => {
              pPhotographers.push(Photographer.create(seederHelpers.generatePhotographer(user.id, categories)));
            });

            Promise.all(pPhotographers)
              .then(photographers => {
                // generate 9 photos per user
                _.map(photographers, photographer => {
                  let chosenCategories = arrayHelpers.getRandomArrayItems(categories, 2);
                  for (let i = 0; i < 9; i++) {
                    Photo.create(seederHelpers.generatePhoto(photographer, Math.floor(Math.random() * 5) + 1))
                  }
                  photographer.setCategories(chosenCategories);
                })
              }).catch(err => {
              console.log('Error: ', err);
            })
          });

      });
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
