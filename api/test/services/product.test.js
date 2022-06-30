const app = require('../../src/app');

describe('\'product\' service', () => {
  it('registered the service', () => {
    const service = app.service('product');
    expect(service).toBeTruthy();
  });
});
