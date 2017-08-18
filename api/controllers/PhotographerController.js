/* ESLint local declarations */
/* global validationHelper, hardcodedHelpers */
/* ESLint end */

module.exports = {

  /**
   * GET basic information for single photographer
   * */
  getBasicInfo: function(req, res) {
    let userId = req.param('id');

    if(!validationHelper.isPositiveInt(userId)) {
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

      pPhotographer.then(photographer => {
        res.status(200).send(responseParseService.photographerBasicInfo(photographer));
      })
    }

  },

  /**
   * GET featured photographers [landing page]
   * @query page: pagination current page
   * @query results_per_page: number of wanted results per page
   * @return artists: array of featured artists
   * */
  getFeatured: function(req, res) {
    let page              = req.query.page || 1;
    let results_per_page  = req.query.results_per_page || 6;


    if (!validationHelper.isPositiveInt(page)) {
      res.status(400).send({message: 'Page does not exist. Please use page number that equals or is greater than 1.'});
    } else if (!validationHelper.isPositiveInt(results_per_page)) {
      res.status(400).send({message: 'Number of results per page is not a positive integer'});
    } else  {

      // hardcoded response for frontend use
      // todo: to be replaced with real database-model data
      let artists = [];

      for (let i=0; i<results_per_page; i++) {
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

