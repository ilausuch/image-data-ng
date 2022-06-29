const axios = require('axios').default;
const config = require('./config')

class Api {
  constructor(){
    //TODO check the configuration is ok

    this.url = config.api.url
  }

  async find(service, query){
    let queryarr = []
    for (let k in query)
      queryarr.push(`${k}=${query[k]}`)

    let url = `${this.url}/${service}?${queryarr.join("&")}`
    const result = await axios.get(url)
    return result.data
  }
}

module.exports = Api