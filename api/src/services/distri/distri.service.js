// Initializes the `distri` service on path `/distri`
const { Distri } = require('./distri.class');
const hooks = require('./distri.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/distri', new Distri(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('distri');

  service.hooks(hooks);
};
