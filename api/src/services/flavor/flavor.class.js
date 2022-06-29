/* eslint-disable no-unused-vars */
exports.Flavor = class Flavor {
  constructor (options, app) {
    this.options = options || {};
	this.app = app;
  }

  async find (params) {
	let cmd = "SELECT DISTINCT flavor from size";
	console.log(params);
	if (params?.query?.product) {
		cmd += ` WHERE product = '${params.query.product}'`;
	}

	console.log(cmd);
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
