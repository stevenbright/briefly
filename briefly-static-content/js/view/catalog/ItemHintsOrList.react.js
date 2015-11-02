
'use strict';

import React, {Component} from 'react';

import Immutable from "immutable";
import type CatalogItem from '../../model/Item';

import InlineCatalogItemWithIdList from './InlineCatalogItemWithIdList.react';

type Props = {
  elementType: string,
  itemList: ?Immutable.List<CatalogItem>,
  nameParts: ?Immutable.List<string>
};

type State = {};

export default class ItemHintsOrList extends Component<{}, Props, State> {
  render(): ?ReactElement {
    var elementName = this._getElementName();

    console.log("ItemHintsOrList.render", this.props);

    if (this.props.itemList != null) {
      return (
        <div>
          <h2>{elementName} List</h2>
          <InlineCatalogItemWithIdList items={this.props.itemList} />
        </div>
      );
    } else if (this.props.nameParts.size > 0) {
      const nameParts = this.props.nameParts.map(part => {
        var itemUrl = "#/item/" + this.props.elementType + "/prefix/" + encodeURIComponent(part);
        return (<span key={part} className="named-value-elem"><a href={itemUrl}><strong>{part}</strong>&nbsp;<small>&hellip;</small></a></span>);
      });

      return (
        <div>
          <h2>{elementName} Name Hints</h2>
          <p>{nameParts}</p>
        </div>
      );
    }

    return (<p>{elementName} hints are empty</p>);
  }

  _getElementName(): string {
    const type = this.props.elementType;
    // Use type name itself with first letter in uppercase
    return type.substring(0, 1).toUpperCase() + type.substring(1);
  }
}
