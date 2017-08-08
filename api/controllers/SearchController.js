/**
 * Created on 08/08/2017.
 */

module.exports = {

  search: function(req, res) {

    let page              = req.query.page || 1,
        results_per_page  = req.query.results_per_page || 10,
        lat               = req.query.lat,
        lon               = req.query.lon,
        category          = req.query.category,
        radius            = req.query.radius,
        followers_min     = req.query.followers_min,
        followers_max     = req.query.followers_max;

    // todo: test for page out of range

    if (!validationHelper.isPositiveInt(results_per_page)) {
      res.status(400).send({message: 'Number od results is not a positive integer.'});
    } else if(!validationHelper.isPositiveInt(page)) {
      res.status(400).send({message: 'Page number is not a positive integer.'});
    } else if(!lat || !validationHelper.isValidCoordinate(lat)) {
      res.status(400).send({message: 'Latitude is not defined or is not a valid coordinate.'});
    } else if(!lon || !validationHelper.isValidCoordinate(lon)) {
      res.status(400).send({message: 'Longitude is not defined or is not a valid coordinate.'});
    } else {

      let artists = [];
      for (let i = 0; i < results_per_page; i++) {
        artists.push(hardcodedHelpers.generateArtist());
      }

      res.status(200).send({
        results: artists,
        total_pages: 24
      });

    }

  }

};
