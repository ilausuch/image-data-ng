const pg = require('pg')

class Connection {
  constructor() {
	if (!process.env.DB_CONNECTION) {
		throw new Error('DB_CONNECTION environment variable is unset');
	}

    this.client = new pg.Client(process.env.DB_CONNECTION);
    this.client.connect()
      .then(console.log("Connection with DB OK"))
  }

  query(query) {
    return this.client.query(query)
  }
}

module.exports = Connection
