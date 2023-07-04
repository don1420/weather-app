const request = require('postman-request')

const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/zaporizhia.json?access_token=pk.eyJ1IjoiZnJlZW1hbjg2MTciLCJhIjoiY2xqb2NzcGNuMW02bzNxcGo0N3cxc2czdiJ9.eZg5CRqdxn1Y7ZUjQFSWug&limit=1'
const weatherstackApiUrl = 'http://api.weatherstack.com/current?access_key=99bd0f3f0e3888763eb1bf3a937ce609&query=47.9205,35.0841"&units=m'

request({url: mapboxApiUrl, json: true}, function (error, response, body) {
  if (error) {
    console.log(error)
    console.log('Unable to connect to Mapbox API.')
  } else if (body.features && body.features.length === 0) {
    console.log('Unable to find location. Try another search.')
  }
  else {
    const latitude = body.features[0].center[0]
    const longitude = body.features[0].center[1]
      console.log('latitude/longitude: ', latitude, '/', longitude)
  }
});

request({url: weatherstackApiUrl, json: true}, function (error, response, body) {
  if (error) {
    console.log(error)
    console.log('Unable to connect to Weatherstack API')
  } else if (response.body.error) {
    console.log('Unable to find location')
  } else {
    console.log(`It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out.`)
  }
});