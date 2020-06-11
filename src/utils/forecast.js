const request = require('postman-request')

/*
const url = "http://api.weatherstack.com/current?access_key=f00ce6e8df6d16ccffbf6099a2752a10&query=37.8267,-122.4233"

request({ url: url, json: true }, (error, response) => {
   if(error){
    console.log("Unable to connect")
   } else if (response.body.error) {
    console.log(response.body.error.info)
   } else {
    const data = response.body.current
    const temperature = data.temperature
    const feelslike = data.feelslike
    const weather_description = data.weather_descriptions[0]
    console.log("It is " +weather_description + ". " + temperature + " degrees, it feels like " + feelslike + " degrees.")
   }
   
})

*/

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url= "http://api.weatherstack.com/current?access_key=f00ce6e8df6d16ccffbf6099a2752a10&query=" + latitude + "," + longitude
    request({ url, json:true},(error, { body}) => {
        if(error){
            callback("Unable to connect",undefined)
        }else if(body.error){
            callback(body.error.info, undefined)
        }else{
            const data = body.current
            const temperature = data.temperature
            const feelslike = data.feelslike
            const weather_description = data.weather_descriptions[0]
            callback(undefined, "It is " + weather_description + ". " + temperature + " degrees, it feels like " + feelslike + " degrees.")
        }
    })
}

module.exports = forecast