var React = require('React');

// page to be demo'ed:
var DetailPage = require('../content/detail-page.js');
var PersonHintsView = require('../person/person-hints-view.js');
var GenericListItemView = require('../content/generic-list-item-view.js');

// parsing query
var parseQueryString = require('../../util/uri.js').parseQueryString;

module.exports = React.createClass({
  render: function() {
    var queryParam = parseQueryString(window.location.search);
    var mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return (<DetailPage />);
    } else if (mode == "2") {
      var model = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 3, name: "Cavin"}, {id: 4, name: "Eva"}];
      return (<PersonHintsView personList={model} />);
    } else if (mode == "3") {
      var model = ["Ba", "Be", "Bo"];
      return (<PersonHintsView nameParts={model} />);
    } else if (mode == "4") {
      var model = {
        id: 1029,
        name: "A Christmas Carol",
        relatedItems: {
          author: [{id: 5097, name: "Charles Dickens", type: "person"}],
          illustrator: [{id: 6970, name: "Sam Golding", type: "person"}, {id: 7041, name: "George Irwing", type: "person"}],
          language: [{id: 12, name: "en", type: "language"}],
          genre: [{id: 98710, name: "fiction", type: "genre"}, {id: 40125, name: "classic", type: "genre"}]
        }
      };
      return (<ul><GenericListItemView item={model} /></ul>);
    }

    return (
      <div className="container">
        <tt>Unknown Demo Page &lt;Draft&gt;</tt>
      </div>
    );
  }
});

