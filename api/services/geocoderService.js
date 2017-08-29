const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyB5nLVu0qwOrKcQMGrTHUt7sFSWzcQkDYI',
  formatter: null
};
const geocoder = NodeGeocoder(options);

module.exports = {
  getGeolocString: (loc, response) => {
    geocoder.reverse({ lat: loc.lat, lon: loc.lon }, function(err, res) {
      response(res);
    });
  }
};
