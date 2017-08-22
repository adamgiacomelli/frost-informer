const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyB5nLVu0qwOrKcQMGrTHUt7sFSWzcQkDYI',
  formatter: null
};
const geocoder = NodeGeocoder(options);

module.exports = {
  getGeolocString: ({ lat, lon }) => {
    return geocoder.reverse({ lat, lon });
  }
};
