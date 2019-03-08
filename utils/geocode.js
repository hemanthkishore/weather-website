// Code to get the geo code based on the location name

const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGVtYW50aDciLCJhIjoiY2pzdnMwNzFlMDVvbzQzdDN4Z3RycmE4eCJ9.dJA8c6FxFRS6pU53ZocDww'

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        }else if(response.body.features.length == 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })    

}

module.exports = geoCode

// End of File