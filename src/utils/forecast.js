const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=40ed1a04e99990fe4944c3b998145eb0&query='+ latitude + ',' + longitude +'&units=m'
        // const url = 'http://api.weatherstack.com/current?access_key=40ed1a04e99990fe4944c3b998145eb0&query=53.957749,-2.250608&units=m'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined) 
             } else if (body.error)  {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '  It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + ' degrees.  The Win speed will be ' + body.current.wind_speed +' mph from the '+ body.current.wind_dir + ' direction.')
            
           
        }
    })
}









module.exports = forecast
