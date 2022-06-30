const size = require('./size/size.service.js');
const product = require('./product/product.service.js');
const flavor = require('./flavor/flavor.service.js');
const distri = require('./distri/distri.service.js');
const version = require('./version/version.service.js');
const arch = require('./arch/arch.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(size);
  app.configure(product);
  app.configure(flavor);
  app.configure(distri);
  app.configure(version);
  app.configure(arch);
}
