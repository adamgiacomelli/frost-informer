/* ESLint local declarations */
/* global validationHelper, hardcodedHelpers */
/* ESLint end */
const _ = require('lodash');

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
          }
        ]
      });

      pPhotographer
        .then(photographer => {
          res
            .status(200)
            .send(responseParseService.photographerBasicInfo(photographer));
        })
        .catch(err => {
          res
            .status(400)
            .send({ message: `Error retrieving photographers data: ${err}` });
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
            res
              .status(400)
              .send({
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
                  33
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
