module.exports = {

  search: function(req, res) {

    let { lat, lon, category, radius, followers_min, followers_max, page, results_per_page } = req.query;
    page = page || 1;
    results_per_page = results_per_page || 10;

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

      let query = searchHelpers.querySetup(req.query);

      let promises = [];
      promises.push(Photographer.count());

      /** grab users from database */
      promises.push(Photographer.findAll({
        limit: results_per_page,
        offset: (page-1)*results_per_page
      }));

      Promise.all(promises)
        .then(results => {
          res.status(200).send(results);
        });

      /**
       * hardcore generated users
       * todo: remove code block
       * */

      /*
      let artists = [];
      for (let i = 0; i < results_per_page; i++) {
        artists.push(hardcodedHelpers.generateArtist());
      }

      res.status(200).send({
        results: artists,
        total_pages: 24
      });
      */

    }

  }

};
