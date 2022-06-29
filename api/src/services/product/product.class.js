/* eslint-disable no-unused-vars */
exports.Product = class Product {
  constructor (options, app) {
    this.options = options || {};
	this.app = app;
  }

  async find () {
	let cmd = `SELECT DISTINCT product from size`;
	const res = await this.app.db.query(cmd);
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
};
