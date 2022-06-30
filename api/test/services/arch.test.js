const app = require('../../src/app');

describe('\'arch\' service', () => {
  it('registered the service', () => {
    const service = app.service('arch');
    expect(service).toBeTruthy();
  });
});
