//jest.dontMock('../js/some-dependency.js');
//var uri = require('../js/some-dependency.js');

describe('foo business logic', function () {
  it('does nothing', function () {
    // Given:
    var a = 1;

    // When:
    var b = a + 1;

    // Then:
    expect(b).toBe(2);
  });
});