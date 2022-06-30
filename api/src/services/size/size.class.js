/* eslint-disable no-unused-vars */
exports.Size = class Size {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  /* return a list of rows
 * * filtered by columns with given values
 * optionally limit the number of fetch records
*/
  async find (params) {
    let cmd = ["SELECT", "*", "from", "size"];

    if (Object.getOwnPropertyNames(params.query).length > 0) {
      cmd.push('WHERE');
      for (let [k, v] of Object.entries(params.query)) {
        if (!Object.hasOwn(params.query, k)) {
          continue;
        }

        if (k === 'last' ) {
          cmd.pop();
          cmd.push('LIMIT');
          cmd.push(v);
          cmd.push('AND');
        } else {
          cmd.push(k);
          cmd.push("=");
          cmd.push(`'${v}'`);
          cmd.push('AND');
        }

      }
      // always remove last AND
      cmd.pop();
    }

    const res = await this.app.db.query(cmd.join(" "));
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
