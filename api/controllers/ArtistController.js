/**
 * Created by zigakerec on 07/08/2017.
 */

module.exports = {

  /**
   * GET featured artists [landing page]
   * @query page: pagination current page
   * @query results_per_page: number of wanted results per page
   * @return artists: array of featured artists
   * */
  getFeatured: function(req, res) {
    let page              = req.query.page || 1,
        results_per_page  = req.query.results_per_page || 6;


    if (page < 1) {
      // error page does not exist
      res.status(400).send({message: 'Page does not exist. Please use page number that equals or is greater than 1.'});
    }

    // hardcoded response for frontend use
    // todo: to be replaced with real database-model data

    let artists = [];

    for (let i=0; i<results_per_page; i++) {
      artists.push(hardcodedHelpers.generateArtist());
    }

    res.status(200).send({
      results: artists,
      total_pages: 24
    });

  }
};

