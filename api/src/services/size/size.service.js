// Initializes the `size` service on path `/size`
const { Size } = require('./size.class');
const hooks = require('./size.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/size', new Size(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('size');

  service.hooks(hooks);
};
