const pg = require('pg')

class Connection {
  constructor() {
    this.client = new pg.Client(process.env.DB_CONNECTION);
    this.client.connect()
      .then(console.log("Connection with DB OK"))
  }

  query(query) {
    return this.client.query(query)
  }
}

module.exports = Connection