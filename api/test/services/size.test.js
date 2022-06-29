const app = require('../../src/app');

describe('\'size\' service', () => {
  it('registered the service', () => {
    const service = app.service('size');
    expect(service).toBeTruthy();
  });
});
