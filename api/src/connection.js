const pg = require('pg');
const url = require('url');

class Connection {
  constructor() {
    if (!process.env.DB_CONNECTION) {
      throw new Error('DB_CONNECTION environment variable is unset');
    }

    const env_params = url.parse(process.env.DB_CONNECTION);
    const auth = env_params.auth.split(':');

    this.client = new pg.Pool({
      user: auth[0],
      password: auth[1],
      host: env_params.hostname,
      port: env_params.port,
      database: env_params.pathname.split('/')[1],
      ssl: false,
      connectionTimeoutMillis: 0,
      idleTimeoutMillis: 60000
    });
    this.client.connect()
      .then(console.log("Connection with DB OK"));
  }

  query(query) {
    let res;

    console.log(query);

    try {
      res = this.client.query(query);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        this.client.connect().then(console.log("Reconnected to DB"));
      }

      res = this.client.query(query);
    }

    return res;
  }
}

module.exports = Connection
