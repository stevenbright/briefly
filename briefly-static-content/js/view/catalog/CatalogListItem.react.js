'use strict';

import React, {Component} from 'react';

var FavStar = require('../common/FavStar.react');
var InlineCatalogItem = require('../catalog/InlineCatalogItem.react');

export default class CatalogListItem extends Component<{},
  /*Props*/{ item: object, isFavorite: boolean },
  /*State*/{}> {

  render(): ?ReactElement {
    // {id: 1, title: 'Item Name', type: 'book', relatedItems: {genre: [{<NamedItem>}], person: [{<NamedItem>}]}}
    const item = this.props.item;
    const itemDetailPageUrl = '#/item/' + item.type + '/' + item.id; // TODO: detail page?

    const isFavorite = this.props.isFavorite;

    // related items UI
    const relatedItemElementsUi = [];
    for (var relationKey in item.relatedItems) {
      if (!item.relatedItems.hasOwnProperty(relationKey)) {
        continue;
      }

      const relatedEntriesUi = item.relatedItems[relationKey].map(function (relatedItem) {
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
}
