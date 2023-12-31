const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJlZW1hbjg2MTciLCJhIjoiY2xqb2NzcGNuMW02bzNxcGo0N3cxc2czdiJ9.eZg5CRqdxn1Y7ZUjQFSWug&limit=1`

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Mapbox API.', undefined)
        } else if (body.features && body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode