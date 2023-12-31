const readline = require('readline')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const readLocation = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getWether = (location) => geocode(location, (error, {latitude, longitude, location}) => {
    if (error) {
        return console.log('Geocode error: ', error)
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
        if (error) {
            return onsole.log('Forecast error: ', forecastError)
        }
        console.log(location, 'latitude/longitude: ', latitude, '/', longitude)
        console.log(`It is currently ${forecastData.temperature} degress out. It feels like ${forecastData.feelslike} degress out. ${forecastData.weather_descriptions}.`)
    })
})

readLocation.question('Please enter your location: \n', (userInput) => {
    if (userInput.trim() == '') {
        readLocation.setPrompt('You have not entered your location. Please enter your location: \n')
        readLocation.prompt()

        readLocation.on('line', (userInput) => {
            if (userInput.trim() == '') {
                readLocation.setPrompt('You have not entered your location. Please enter your location: \n')
                readLocation.prompt()
            }
            else {
                getWether(userInput)
                readLocation.close();
            }
        })
    }

    else {
        getWether(userInput)
        readLocation.close();
    }
})