const yargs = require('yargs')
const axios = require('axios')

const argv = yargs.option({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch the weather',
    string: true
  }
}).help().alias('help', 'h').argv

var encodedAddress = encodeURIComponent(argv.address)
var geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=${encodedAddress}`

axios.get(geoCodeUrl).then((response) => {
  if (response.data.info.status === 400) {
    console.log('please provide an address')
  }
  var latitude = response.data.results[0].locations[0].latLng.lat
  var longitude = response.data.results[0].locations[0].latLng.lng
  var address = response.data.results[0].providedLocation.location
  console.log(`Address: ${address}`)
  console.log(`Latitude: ${latitude}`)
  console.log(`Longitude ${longitude}`)
  var WeatherUrl = `https://api.darksky.net/forecast/KEY/${latitude},${longitude}`
  return axios.get(WeatherUrl)
}).then((response) => {
  var temperature = response.data.currently.temperature
  var apparentTemperature = response.data.currently.apparentTemperature
  console.log(`It is currently ${temperature} and it feels like ${apparentTemperature}`)
}).catch((e) => {
  console.log(e)
})
