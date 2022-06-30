const app = require('../../src/app');

describe('\'version\' service', () => {
  it('registered the service', () => {
    const service = app.service('version');
    expect(service).toBeTruthy();
  });
});
