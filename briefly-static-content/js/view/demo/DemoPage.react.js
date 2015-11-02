'use strict';

import React, {Component} from 'react';

// page to be demo'ed:
import DetailPage from '../catalog/DetailPage.react';
import CatalogList from '../catalog/CatalogList.react';
import GenericCatalogItemDetails from '../catalog/GenericCatalogItemDetails.react';

import ItemHintsOrList from '../catalog/ItemHintsOrList.react';

// parsing query
import {parseQueryString} from '../../util/uri.js';

import CatalogItem from '../../model/catalog/Item';
import DemoData from '../../service/DemoData';

export default class DemoPage extends Component<{}, Props, State> {
  render(): ?ReactElement {
    const queryParam = parseQueryString(window.location.search);
    const mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return (<DetailPage />);
    } else if (mode == "2") {
      return (<ItemHintsOrList elementType='person' itemList={DemoData.NAMES_1} />);
    } else if (mode == "3") {
      return (<ItemHintsOrList elementType='person' nameParts={DemoData.NAME_HINTS_1} />);
    } else if (mode == "4") {
      return <CatalogList items={DemoData.CATALOG_LIST} />;
    } else if (mode == "5") {
      return (<GenericCatalogItemDetails isFavorite={true} item={DemoData.FAR_RAINBOW} />);
    }

    return (
      <div className="container">
        <ul>
          <li><a href="/?mode=1#/demo">Detail Page</a></li>
          <li><a href="/?mode=2#/demo">Person Names List</a></li>
          <li><a href="/?mode=3#/demo">Person Hints List</a></li>
          <li><a href="/?mode=4#/demo">Catalog List</a></li>
          <li><a href="/?mode=5#/demo">Generic Catalog Item Details</a></li>
        </ul>
      </div>
    );
  }
}

