// Initializes the `product` service on path `/product`
const { Product } = require('./product.class');
const hooks = require('./product.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product', new Product(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product');

  service.hooks(hooks);
};
