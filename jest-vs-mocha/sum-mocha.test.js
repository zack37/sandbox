const expect = require('chai').expect;
const sum = require('./');

describe('mocha tests', () => {

  it('should sum 1 + 2', () => {
    expect(sum(1, 2)).to.equal(3);
  });

  it('should fail sum 1 + 2', () => {
    expect(sum(1, 2)).to.equal(4);
  });
});
