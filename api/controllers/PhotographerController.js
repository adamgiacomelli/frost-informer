/* ESLint local declarations */
/* global validationHelper, hardcodedHelpers */
/* ESLint end */

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
      !categories
    ) {
      res.status(400).send({ message: 'POST data object is not complete.' });
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
                priceRange
              })
            );

            Promise.all(promisses)
              .then(resolves => {
                res.status(200).send({ message: `User updated!` });
              })
              .catch(err => {
                res
                  .status(400)
                  .send({
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

  /**
   * GET featured photographers [landing page]
   * @query page: pagination current page
   * @query results_per_page: number of wanted results per page
   * @return artists: array of featured artists
   * */
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
