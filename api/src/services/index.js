const size = require('./size/size.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(size);
}
