'use strict';

import React, {Component} from 'react';
import CatalogListItem from './CatalogListItem.react';

export default class CatalogList extends Component<{}, /*Props*/{}, /*State*/{}> {

  render(): ?ReactElement {
    const bookNodes = this.props.items.map(function (item) {
      return (<CatalogListItem key={item.id} item={item} isFavorite={false} />);
    });

    return (
      <ul className="catalog-list">
        {bookNodes}
      </ul>
    );
  }
}
