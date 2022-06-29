// Initializes the `flavor` service on path `/flavor`
const { Flavor } = require('./flavor.class');
const hooks = require('./flavor.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/flavor', new Flavor(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('flavor');

  service.hooks(hooks);
};
