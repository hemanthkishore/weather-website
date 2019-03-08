// Code to get the weather based on the location

const request = require('request')

const forecast = (address, callback) => {

    const url = 'https://api.darksky.net/forecast/5ebba3038205e33d09e9555589551564/'+ address.latitude + ',' + address.longitude +'?units=si'

    request({url: url, json: true}, (error, response)=> {

        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(response.body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, {
                temparature: response.body.currently.temperature,
                rainprobability: response.body.currently.precipProbability,
                location: address.location       
            })
        }

    })
}


module.exports = forecast
// End of File