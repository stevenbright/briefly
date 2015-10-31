
'use strict';

import React, {Component} from 'react';
import type CatalogItem from '../../model/Item';

type Props = {
  item: CatalogItem,
};

type State = {};

export default class InlineCatalogItem extends Component<{}, Props, State> {
  //state = {}
  render(): ?ReactElement {
    // Sample item: {id: 1000, name: "A Christmas Carol", type: "book"}
    const item = this.props.item;
    const itemHref = "#/item/" + item.type + "/" + item.id; // TODO: detail page?

    return (
      <span className="inline-item">
        <a href={itemHref} title={this.props.item.name}>{this.props.item.name}</a>
      </span>
    );
  }
}
