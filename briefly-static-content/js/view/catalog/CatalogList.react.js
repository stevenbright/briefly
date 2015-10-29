var React = require('react');
var CatalogListItem = require('./CatalogListItem.react');

module.exports = React.createClass({
  render: function() {
    var bookNodes = this.props.items.map(function (item) {
      return (<CatalogListItem key={item.id} item={item} isFavorite={false} />);
    });

    return (
      <ul className="catalog-list">
        {bookNodes}
      </ul>
    );
  }
});
