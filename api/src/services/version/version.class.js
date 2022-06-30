/* eslint-disable no-unused-vars */
exports.Version = class Version {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    let cmd = 'SELECT DISTINCT version FROM size';
    let is_where = 0;
	
    for (const [k, v] of Object.entries(params.query)) {
      if (!is_where) {
        cmd += ' WHERE';
        is_where = 1;
      } else {
        cmd += ' AND';
      }

      cmd += ` ${k} = '${v}'`;
    }

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
