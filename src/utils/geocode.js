const request = require('request')
const chalk = require('chalk')


const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhlcm95c2hhbnRhbnUiLCJhIjoiY2tkMTlwOTRmMTFjaTJxcHY4enl5Z2RmbiJ9.KMCx77YZcBPgc1RUvOeWcg&limit=1'

    request({url, json : true}, (error, {body})=> {
        if(error) {
            callback(chalk.red.inverse("Unable to connect to Weather service!"), undefined)
        }else if(body.features.length === 0){
            callback('Incorrect location provided. Please try with another location!', undefined)
        }else {
            callback(undefined, {
                longnitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode