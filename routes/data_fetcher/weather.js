var Promise = require("bluebird")
const request = require('request')
var keys = require('../../keys.js')


var createUrl = (midpointCoord) => {
  let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='
  let latitude = midpointCoord[0]
  let longitude = '&lon=' + midpointCoord[1]
  let units = '&units=imperial'
  let apiKey = '&appid=' + keys.openWeatherApiKey
  return baseUrl + latitude + longitude + units + apiKey
}

var formatReturnData = (body) => {
  let parser = JSON.parse(body)
  windData = []
  windData['windHeading'] = parser.wind.deg
  windData['windSpeedMPH'] = parser.wind.speed
  return windData
}


var getWeatherWithBluebird = (midpointCoord) => {
  return new Promise(function(resolve, reject) {
    let url = createUrl(midpointCoord)

    request(url, (err, resp, body) => {
      if (err) {reject(err)}
      else {
        resolve(body)
      }
    });
  })
}

var runOpenWeather = (midpointCoord) => {
  getWeatherWithBluebird(midpointCoord)
  .then((body) => {
    let windData = formatReturnData(body)
    console.log(windData)
  })
  .catch(function(error) {
    console.log('Open Weather error through bluebird: ' + error)
  })
}

module.exports = runOpenWeather
// runOpenWeather([40.726861018183236, -73.99984474975099])
// run the function call above to get this return:
// [ windHeading: 260.502, windSpeedMPH: 8.68 ]