var React = require('React');
var InlineCatalogItemWithId = require('../catalog/InlineCatalogItemWithId');

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.persons.map(function (person) {
      var url = "#/person/" + person.id;
      return (<InlineCatalogItemWithId key={person.id} url={url} item={person} />);
    });

    return (<p>{personNodes}</p>);
  }
});
