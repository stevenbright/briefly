
'use strict';

import React, {Component} from 'react';

import InlineCatalogItemWithId from './InlineCatalogItemWithId.react';

import Immutable from "immutable";
import type CatalogItem from '../../model/Item';

type Props = {
  persons: Immutable.List<CatalogItem>
};

type State = {};

export default class PersonList extends Component<{}, Props, State> {
  render(): ?ReactElement {
    const elements = this.props.items.map(item => <InlineCatalogItemWithId key={item.id} item={item} />);
    return (<p>{elements}</p>);
  }
}
