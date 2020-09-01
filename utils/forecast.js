const request = require('request');

const forecast = ({longitude, latitude} = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=83a63a32cd6ab7a1eff2febea477ba9d&query=${longitude},${latitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(undefined, `It is currently ${body.current.temperature}. ${body.current.weather_descriptions[0]}.
       Feels like: ${body.current.feelslike}. Last observation time: ${body.current.observation_time}. Current wind speed: ${body.current.wind_speed}`);
    }
  });
};

module.exports = forecast;


