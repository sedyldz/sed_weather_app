const  request = require('postman-request')

const geocode = (address, callback) => {
    //encodeURIComponent kullnama sebebimiz birisi query ye ? yazarsa patlamasın diye
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2VkeWxkeiIsImEiOiJja2IxYXNyc2YwMDlzMnJzNXpyNGpjMzkyIn0.9EgK_5CjBI1HuaQa0_qKeA&limit=1"
    request({ url , json: true}, (error, { body }) => {
        if(error) {
            callback('Unanle to connect to location services', undefined) //undefined yazmasan da birebir aynı şey
        }else if(body.features.length === 0) {
            callback('No results found', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

/*
//Geocoding
//Address -> Lat/Long -> Weather

place = "istanbul"
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?access_token=pk.eyJ1Ijoic2VkeWxkeiIsImEiOiJja2IxYXNyc2YwMDlzMnJzNXpyNGpjMzkyIn0.9EgK_5CjBI1HuaQa0_qKeA&limit=1"

request({ url: geocodeURL, json: true }, (error, response) => {
    if(error){
        console.log("Unable to connect")
    }else if(response.body.features.length === 0){
        console.log("No results found")
    }else{
        const data = response.body.features[0]
        const latitude = data.center[1]
        const longitude = data.center[0]
        const coordinates = data.geometry.coordinates
        console.log("Lat:" + latitude + " Long: " +longitude)
        console.log(coordinates)
    }
})
*/

module.exports = geocode