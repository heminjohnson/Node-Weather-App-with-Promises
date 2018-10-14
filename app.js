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
  console.log(response.data.results)
}).catch((e) => {
  console.log(e)
})
