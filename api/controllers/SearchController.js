const _ = require('lodash');

module.exports = {

  search: function(req, res) {

    let { lat, lon, category, radius, followers_min, followers_max, page, results_per_page } = req.query;
    page = parseInt(page) || 1;
    results_per_page = parseInt(results_per_page) || 10;

    if (!validationHelper.isPositiveInt(results_per_page)) {
      res.status(400).send({message: 'Number od results is not a positive integer.'});
    } else if(!validationHelper.isPositiveInt(page)) {
      res.status(400).send({message: 'Page number is not a positive integer.'});
    } else if(!lat || !validationHelper.isValidCoordinate(lat)) {
      res.status(400).send({message: 'Latitude is not defined or is not a valid coordinate.'});
    } else if(!lon || !validationHelper.isValidCoordinate(lon)) {
      res.status(400).send({message: 'Longitude is not defined or is not a valid coordinate.'});
    } else if(category && !validationHelper.isPositiveInt(parseInt(category))) {
      res.status(400).send({message: 'Category is not a positive integer.'});
    } else if((followers_min && !followers_max) || followers_max && !followers_min) {
      res.status(400).send({message: 'Both followers_min and followers_max have to be set!'});
    } else if(followers_max && followers_min && (!validationHelper.isPositiveInt(parseInt(followers_min)) || !validationHelper.isPositiveInt(parseInt(followers_max)))) {
      res.status(400).send({message: 'Both followers_min and followers_max have to be positive integers!'});
    } else if(followers_max < followers_min) {
      res.status(400).send({message: 'followers_max has to be higher number than followers_mon'});
    } else if(radius && !validationHelper.isPositiveInt(radius)) {
      res.status(400).send({message: 'Radius should be positive integer (distance in kilometers).'})
    } else {

      let pagination = {
        limit: results_per_page,
        offset: (page-1)*results_per_page
      };
      let query = searchHelpers.querySetup(req.query);
      let props = {};

      Object.assign(props, ...[query, {distinct: true}, pagination]);

      // grab users from database
      let pPhotographers = Photographer.findAndCountAll(props);
      pPhotographers
        .then(result => {
          let r = result.rows;
          let photographers = [];
          _.map(r, photographer => {
            photographers.push(searchHelpers.generatePhotographer(photographer));
          });

          res.status(200).send({
            results: photographers,
            totalPages: Math.ceil(result.count/results_per_page)
          });
        })
        .catch(err => {
          res.status(400).send({ message: 'Error retrieving photographers:', err });
        })

    }

  }

};
