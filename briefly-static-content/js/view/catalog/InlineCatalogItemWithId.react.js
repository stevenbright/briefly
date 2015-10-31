
'use strict';

import React, {Component} from 'react';

import type CatalogItem from '../../model/Item';

type Props = {
  item: CatalogItem
};

type State = {};

export default class InlineCatalogItemWithId extends Component<{}, Props, State> {
  render(): ?ReactElement {
    const item = this.props.item;
    const itemHref = "#/item/" + item.type + "/" + item.id; // TODO: detail page?

    return (
      <span className="named-value-elem">
        <a href={itemHref}>
          <small>{item.id}.</small>&nbsp;<strong>{item.name}</strong>
        </a>
      </span>
    );
  }
}
