const chaiExpect = require('chai').expect;
const sum = require('.');

describe('jest tests', () => {
  it('should pass sum 1 + 2 with jest expect', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should pass sum 1 + 2 with chai expect', () => {
    chaiExpect(sum(1, 2)).to.equal(3);
  });

  it('should fail sum 1 + 2 with jest expect', () => {
    expect(sum(1, 2)).toBe(4);
  });

  it('should fail sum 1 + 2 with chai expect', () => {
    chaiExpect(sum(1, 2)).to.equal(4);
  });
});
