var React = require('React');
var PersonList = require('./person-list.js');

module.exports = React.createClass({
  render: function() {
    if (this.props.personList != null) {
      // ok, we have person list - it takes precedence over name parts
      return (<PersonList persons={this.props.personList.values} />)
    }

    if (this.props.nameParts.length == 0) {
      return (<p>No person name suggestions available.</p>);
    }

    var nameParts = this.props.nameParts.map(function (part) {
      var personUrl = "#/persons/prefix/" + encodeURIComponent(part);
      return (<span key={part} className="named-value-elem"><a href={personUrl}><strong>{part}</strong>&nbsp;<small>&hellip;</small></a></span>);
    });

    return (<p>{nameParts}</p>);
  }
});
