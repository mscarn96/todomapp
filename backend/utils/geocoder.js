const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client();

const reverseGeocode = (latlng) =>
  client
    .reverseGeocode({
      params: { latlng, key: process.env.GOOGLE_MAPS_API_KEY },
    })
    .then((r) => {
      return r.data.results[0].formatted_address;
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });

module.exports = reverseGeocode;
