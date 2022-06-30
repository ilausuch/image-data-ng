// Initializes the `arch` service on path `/arch`
const { Arch } = require('./arch.class');
const hooks = require('./arch.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/arch', new Arch(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('arch');

  service.hooks(hooks);
};
