var React = require('React');

var FavStar = require('../common/FavStar');
var InlineCatalogItem = require('../catalog/InlineCatalogItem');

module.exports = React.createClass({

  render: function() {
    // {id: 1, title: 'Item Name', type: 'book', relatedItems: {genre: [{<NamedItem>}], person: [{<NamedItem>}]}}
    var item = this.props.item;
    var itemDetailPageUrl = '#/item/' + item.type + '/' + item.id; // TODO: detail page?

    var isFavorite = this.props.isFavorite;

    // related items UI
    var relatedItemElementsUi = [];
    for (var relationKey in item.relatedItems) {
      if (!item.relatedItems.hasOwnProperty(relationKey)) {
        continue;
      }

      var relatedEntriesUi = item.relatedItems[relationKey].map(function (relatedItem) {
        return (<InlineCatalogItem key={relatedItem.id} item={relatedItem} />);
      });

      relatedItemElementsUi.push(
        <span key={relationKey} className="related-items">
          <span className="related-items-header">{relationKey}&nbsp;</span>
          {relatedEntriesUi}
        </span>
      );
    }

    return (
      <li>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3><small>{item.id}</small>&nbsp;<a href={itemDetailPageUrl} title={item.name}>{item.name}</a></h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <FavStar id={item.id} type={item.type} isFavorite={isFavorite}/>
            </div>
            <div key={relationKey} className="col-md-10">
              {relatedItemElementsUi}
            </div>
          </div>
        </div>
      </li>
    );
  }
});
