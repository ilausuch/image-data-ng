const app = require('../../src/app');

describe('\'flavor\' service', () => {
  it('registered the service', () => {
    const service = app.service('flavor');
    expect(service).toBeTruthy();
  });
});
