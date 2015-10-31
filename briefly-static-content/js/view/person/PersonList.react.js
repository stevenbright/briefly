
'use strict';

import React, {Component} from 'react';

import InlineCatalogItemWithId from '../catalog/InlineCatalogItemWithId.react';

import Immutable from "immutable";
import type CatalogItem from '../../model/Item';

type Props = {
  persons: Immutable.List<CatalogItem>
};

type State = {};

export default class PersonList extends Component<{}, Props, State> {
  render(): ?ReactElement {
    const personNodes = this.props.persons.map(person => <InlineCatalogItemWithId key={person.id} item={person} />);
    return (<p>{personNodes}</p>);
  }
}
