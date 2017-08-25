/* ESLint local declarations */
/* global validationHelper, hardcodedHelpers */
/* ESLint end */
const _ = require('lodash');
const AMONUT_OF_PHOTOS = 33;

module.exports = {
  /**
   * GET basic information for single photographer
   * */
  getBasicInfo: function(req, res) {
    let userId = req.token.id;

    if (!validationHelper.isPositiveInt(userId)) {
      res.status(400).send({ message: 'User ID is not a positive integer.' });
    } else {
      let pPhotographer = Photographer.findOne({
        where: { userId },
        include: [
          {
            model: User,
            as: 'user'
          },
          {
            model: Category,
            as: 'categories'
          },
          {
            model: Photo,
            as: 'photos'
          }
        ]
      });

      pPhotographer
        .then(photographer => {
          if (!photographer) {
            res.status(400).send({ message: 'Photographer not found.' });
          } else {
            res
              .status(200)
              .send(responseParseService.photographerBasicInfo(photographer));
          }
        })
        .catch(err => {
          res
            .status(400)
            .send({ message: `Error retrieving photographers data: ${err}` });
        });
    }
  },

  updateBasicInfo: function(req, res) {
    let userId = req.token.id;
    let {
      firstName,
      lastName,
      lat,
      lon,
      email,
      expertise,
      studio,
      priceRange,
      categories
    } = req.body;

    if (!validationHelper.isPositiveInt(userId)) {
      res.status(400).send({ message: 'User ID is not a positive integer.' });
    } else if (
      (lat && !validationHelper.isValidCoordinate(lat)) ||
      (lon && !validationHelper.isValidCoordinate(lon))
    ) {
      res.status(400).send({ message: 'lat & lon are not valid coordinates.' });
    } else if (
      priceRange &&
      (!validationHelper.isPositiveInt(priceRange) ||
        priceRange > 5 ||
        priceRange < 1)
    ) {
      res.status(400).send({
        message: 'Price range needs to be an integer between 1 and 5.'
      });
    } else if (email && !validationHelper.isValidEmail(email)) {
      res.status(400).send({ message: 'Email address is not valid' });
    } else if (
      !firstName ||
      !lastName ||
      !lat ||
      !lon ||
      !email ||
      !studio ||
      !priceRange ||
      !expertise ||
      !categories
    ) {
      res.status(400).send({ message: 'POST data object is not complete.' });
    } else if (expertise != 'amateur' && expertise != 'professional') {
      res.status(400).send({
        message: "Expertise should be either 'amateur' or 'professional'"
      });
    } else {
      Photographer.findOne({
        where: { userId },
        include: [
          {
            model: User,
            as: 'user'
          },
          {
            model: Category,
            as: 'categories'
          }
        ]
      })
        .then(photographer => {
          if (photographer) {
            let promisses = [];
            promisses.push(photographer.setCategories(categories));
            promisses.push(
              photographer.user.updateAttributes({
                firstName,
                lastName,
                email,
                lat,
                lon
              })
            );
            promisses.push(
              photographer.updateAttributes({
                studio,
                priceRange,
                expertise
              })
            );

            Promise.all(promisses)
              .then(resolves => {
                res.status(200).send({ message: `User updated!` });
              })
              .catch(err => {
                res.status(400).send({
                  message: `Error updating photographer information: ${err}`
                });
              });
          } else {
            res.status(400).send({ message: 'Photograpeher not found.' });
          }
        })
        .catch(err => {
          res
            .status(400)
            .send({ message: `Error retrieving photographer: ${err}` });
        });
    }
  },

  instagramMostLiked: function(req, res) {
    let userId = req.token.id;

    Photographer.findOne({
      where: { userId }
    })
      .then(photographer => {
        instagramApiService.getUsersMedia(photographer, medias => {
          if (medias.error) {
            res.status(400).send({
              message: 'Error retrieving data from instagram API.',
              err: medias.err
            });
          } else {
            res.status(200).send(
              responseParseService.mediaPhotos(
                _.take(
                  _.orderBy(
                    medias,
                    photo => {
                      return photo.likes.count;
                    },
                    ['desc']
                  ),
                  AMONUT_OF_PHOTOS
                )
              )
            );
          }
        });
      })
      .catch(err => {
        res.status(400).send({ message: `Photographer not found ${err}` });
      });
  },

  updatePhotos: function(req, res) {
    let userId = req.token.id;
    let { photos } = req.body;
    let invalidArr = false;
    // check for object array validity
    photos.map(item => {
      if (!('id' in item) || !('photo' in item)) {
        invalidArr = true;
      }
      return null;
    });

    if (photos.length == 0) {
      res.status(400).send({ message: 'Photo ids not defined' });
    } else if (photos.length > 9) {
      res.status(400).send({ message: 'More than 9 photos specified.' });
    } else if (invalidArr) {
      res.status(400).send({
        message: '"photos" array of objects is not structured correctly.'
      });
    } else {
      Photographer.findOne({
        where: {
          userId
        },
        include: [
          {
            model: Photo,
            as: 'photos'
          }
        ]
      })
        .then(photographer => {
          let pPhotos = [];
          Photo.destroy({
            where: {
              photographerId: photographer.id
            }
          })
            .then(() => {
              pPhotos = [];
              photos.map(item => {
                pPhotos.push(
                  Photo.create({
                    instagramImageId: item.id,
                    photographerId: photographer.id,
                    photo: item.photo
                  })
                );
              });
              Promise.all(pPhotos)
                .then(results => {
                  res.status(200).send({ message: 'Success updating photos.' });
                })
                .catch(err => {
                  res.status(400).send({
                    message: 'Error creating photos',
                    err
                  });
                });
              return null;
            })
            .catch(err => {
              res.status(400).send({ message: 'Error updating photos.', err });
            });
        })
        .catch(err => {
          res.status(400).send({ message: 'Photographer not found', err });
        });
    }
  },

  updatePhotoCategory: function(req, res) {
    let { photoId, categoryId } = req.body;
    console.log(photoId, categoryId);

    if (
      !photoId ||
      !categoryId ||
      !validationHelper.isPositiveInt(parseInt(photoId)) ||
      !validationHelper.isPositiveInt(parseInt(categoryId))
    ) {
      res
        .status(400)
        .send({
          message:
            'Both - photoId and categoryId - have to be positive integers.'
        });
    } else {
      Photo.findOne({
        where: {
          id: photoId
        }
      })
        .then(p => {
          return p.updateAttributes({
            categoryId: categoryId
          });
        })
        .then(() => {
          res.status(200).send({ message: 'Photo category updated' });
        })
        .catch(err => {
          res
            .status(400)
            .send({ message: 'Error updating photo category.', err });
        });
    }
  },

  getFeatured: function(req, res) {
    let page = req.query.page || 1;
    let results_per_page = req.query.results_per_page || 6;

    if (!validationHelper.isPositiveInt(page)) {
      res.status(400).send({
        message:
          'Page does not exist. Please use page number that equals or is greater than 1.'
      });
    } else if (!validationHelper.isPositiveInt(results_per_page)) {
      res.status(400).send({
        message: 'Number of results per page is not a positive integer'
      });
    } else {
      // hardcoded response for frontend use
      // todo: to be replaced with real database-model data
      let artists = [];

      for (let i = 0; i < results_per_page; i++) {
        artists.push(hardcodedHelpers.generateArtist());
      }

      // todo: replace total_pages number with real number of total pages
      res.status(200).send({
        results: artists,
        total_pages: 24
      });
    }
  }
};
