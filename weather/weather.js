const request = require('request')

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/13d55e5451855bf29399fe9074475b2c/${lat},${long}`,
        json:true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let temp = (body.currently.temperature - 32)*5/9
            callback(undefined, {
                temperature: temp.toFixed(2)
            })
        } else {
            callback('Unable to fetch weather.')
        }
    })
}

module.exports.getWeather = getWeather;
