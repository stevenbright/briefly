var React = require('React');

// page to be demo'ed:
var DetailPage = require('../content/detail-page.js');
var PersonHintsPage = require('../person/person-hints-page.js');

// parsing query
var parseQueryString = require('../../util/uri.js').parseQueryString;

module.exports = React.createClass({
  render: function() {
    var queryParam = parseQueryString(window.location.search);
    var mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return (<DetailPage />);
    } else if (mode == "2") {
      var model = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
      return (<PersonHintsPage personList={model} />);
    } else if (mode == "3") {
      var model = ["Ba", "Be", "Bo"];
      return (<PersonHintsPage nameParts={model} />);
    }

    return (
      <div className="container">
        <tt>Unknown Demo Page &lt;Draft&gt;</tt>
      </div>
    );
  }
});

