const request = require('postman-request')



const current = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d19cdb472244596bbeea13184d50a79c&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. Feels like " + body.current.feelslike + ", Pressure " + body.current.pressure);
        }
    })
}

module.exports = current