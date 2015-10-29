var React = require('react');

module.exports = React.createClass({
  render: function () {
    // Sample item: {id: 1000, name: "A Christmas Carol", type: "book"}
    var item = this.props.item;
    var href = "#/item/" + item.type + "/" + item.id; // TODO: detail page?

    return (
      <span className="inline-item">
        <a href={this.props.itemNavUrl} title={this.props.item.name}>{this.props.item.name}</a>
      </span>
    );
  }
});
