// Initializes the `version` service on path `/version`
const { Version } = require('./version.class');
const hooks = require('./version.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/version', new Version(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('version');

  service.hooks(hooks);
};
