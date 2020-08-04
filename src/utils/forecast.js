const request = require('request')
const chalk = require('chalk')

const forecast = (longnitude, latitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=f7f4c23b17d7898a60278d6cf35baa66&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longnitude)+'&units=m'

    request({ url : url, json : true}, (error, {body}) => {
        if (error){
            callback(chalk.red.inverse("Unable to connect to Weather service!"),undefined)
        } else if (body.error) {
            console.log(chalk.red('Unable to find location! Try with a other location'),undefined)
        }else {
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out and it feels like '+body.current.feelslike+' degrees. The overall humidity is ' + body.current.humidity +'%. There is a '+body.current.precip+'% chance of rain today.')
        }
    })
}



module.exports = forecast