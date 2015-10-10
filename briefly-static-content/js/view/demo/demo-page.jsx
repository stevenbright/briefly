var React = require('React');

// page to be demo'ed:
var DetailPage = require('../content/detail-page.js');
var PersonHintsPage = require('../person/person-hints-page.js');

// parsing query
var parseQueryString = require('../../util/uri.js').parseQueryString;

module.exports = React.createClass({
  render: function() {
    var queryParam = parseQueryString(window.location.search);
    var mode = (queryParam["mode"] ? parseInt(queryParam["mode"]) : 0);

    switch (mode) {
    case 0: break;
    case 1: return (<DetailPage />);
    case 2:
      var personListModel = {values: [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]};
      return (<PersonHintsPage personList={personListModel} />);
    default:
      return (<div><p><span className="label label-danger">Danger</span>&nbsp;Mode is too big</p></div>);
    }

    return (
      <div className="container">
        <tt>Unknown Demo Page &lt;Draft&gt;</tt>
      </div>
    );
  }
});

