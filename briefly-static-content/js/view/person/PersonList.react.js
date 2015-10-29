var React = require('react');
var InlineCatalogItemWithId = require('../catalog/InlineCatalogItemWithId.react');

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.persons.map(function (person) {
      var url = "#/person/" + person.id;
      return (<InlineCatalogItemWithId key={person.id} url={url} item={person} />);
    });

    return (<p>{personNodes}</p>);
  }
});
