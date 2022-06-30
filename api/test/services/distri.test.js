const app = require('../../src/app');

describe('\'distri\' service', () => {
  it('registered the service', () => {
    const service = app.service('distri');
    expect(service).toBeTruthy();
  });
});
