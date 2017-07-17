const request = require('request')

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address)
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connecto to Google servers')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address')
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    })
}

geocodeAddress('38 Garim-ro').then((res) => {
    console.log(JSON.stringify(res, undefined, 2))
}).catch((errorMessage) => {
    console.log(errorMessage)
})