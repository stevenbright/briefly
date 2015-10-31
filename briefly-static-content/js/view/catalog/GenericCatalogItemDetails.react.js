import React from 'react';

import FavStar from '../common/FavStar.react';
import InlineCatalogItem from '../catalog/InlineCatalogItem.react';

module.exports = React.createClass({
  render: function() {
    var item = this.props.item;
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
        <tr key={relationKey}>
          <td>{relationKey}:</td>
          <td>{relatedEntriesUi}</td>
        </tr>
      );
    }

    return (
      <div className="container">
        <FavStar id={item.id} type={item.type} isFavorite={isFavorite}/>
        <h2>{item.name}</h2>
        <hr/>
        <table className="item-info">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{item.id}</td>
            </tr>
            {relatedItemElementsUi}
          </tbody>
        </table>
        <hr/>
      </div>
    );
  }
});

