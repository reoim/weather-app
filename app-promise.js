const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address)
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`


axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Cannot find the address.')
    } 

    console.log(response.data.results[0].formatted_address)
    let lat = response.data.results[0].geometry.location.lat
    let lng = response.data.results[0].geometry.location.lng
    let weatherUrl = `https://api.darksky.net/forecast/13d55e5451855bf29399fe9074475b2c/${lat},${lng}`
    return axios.get(weatherUrl)
}).then((response) => {
    let temperature = (response.data.currently.temperature -32)*5/9
    let apparentTemperature = (response.data.currently.apparentTemperature -32)*5/9
    console.log(`It's currentyl ${temperature.toFixed(2)} degree. It feels like ${apparentTemperature.toFixed(2)} degree.`)
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(e.message)
    }
})