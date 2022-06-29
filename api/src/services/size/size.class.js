/* eslint-disable no-unused-vars */
const pg = require("pg");

exports.Size = class Size {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const client = new pg.Client(process.env.DB_CONNECTION);

    await client.connect()

    const res = await client.query('SELECT * from size')

    client.end()

    return res.rows;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
