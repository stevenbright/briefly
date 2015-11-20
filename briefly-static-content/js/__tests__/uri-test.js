jest.dontMock('../util/uri.js');

var uri = require('../util/uri.js');
var parseQueryString = uri.parseQueryString;

describe('parse query string', function () {
  it('parses one parameter', function () {
    // Given:
    var url = "http://localhost/resource?debug=1";

    // When:
    var queryParam = parseQueryString(url);

    // Then:
    expect(queryParam["debug"]).toBe("1");
  });
});