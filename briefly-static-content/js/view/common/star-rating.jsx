var React = require('React');

module.exports = React.createClass({
  render: function() {
    return (
      <span className="star-rating">
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
      </span>
    );
  }
});
