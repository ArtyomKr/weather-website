const request = require('request');

const geocode = (address, callback) => {
  if (address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmliaWthMTAxIiwiYSI6ImNrZGx5YjgzNDEzZDQyeHAzc2U4NTM5bzkifQ.66IIf4xitVr2nCsOcJuyUw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location service');
      } else if (body.features.length === 0) {
        callback('No matching address');
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        });
      }
    });
  } else callback('No address provided')
};

module.exports = geocode;