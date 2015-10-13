var React = require('React');
var PersonList = require('./PersonList');

module.exports = React.createClass({
  render: function() {
    var elements;

    if (this.props.personList != null) {
      elements = [
        (<h2>Persons</h2>),
        (<PersonList persons={this.props.personList} />)
      ];
    } else if (this.props.nameParts.length > 0) {
      var nameParts = this.props.nameParts.map(function (part) {
        var personUrl = "#/persons/prefix/" + encodeURIComponent(part);
        return (<span key={part} className="named-value-elem"><a href={personUrl}><strong>{part}</strong>&nbsp;<small>&hellip;</small></a></span>);
      });
      elements = [
        (<h2>Person Name Hints</h2>),
        (<p>{nameParts}</p>)
      ];
    } else {
      elements = [
        (<p>No person suggestions available.</p>)
      ];
    }

    return (<div>{elements}</div>);
  }
});
