'use strict';

import React, {Component} from 'react';

import EolaireApiConsoleView from '../admin/EolaireApiConsoleView.react';
import CatalogAdapterApiConsoleView from '../admin/CatalogAdapterApiConsoleView.react';

// controls to be demo'ed:
import FavStar from '../common/FavStar.react';
import StarRating from '../common/StarRating.react';

// page to be demo'ed:
import LoadingPage from '../common/LoadingPage.react';
import DetailPage from '../catalog/DetailPage.react';
import CatalogList from '../catalog/CatalogList.react';
import GenericCatalogItemDetails from '../catalog/GenericCatalogItemDetails.react';

import ItemHintsOrList from '../catalog/ItemHintsOrList.react';

// parsing query
import {parseQueryString} from '../../util/uri.js';

import CatalogItem from '../../model/catalog/Item';
import DemoData from '../../service/DemoData';

class DemoControlsPage extends Component<{}, {}, {}> {
  render(): ?ReactElement {
    return (
      <div className="container">
        <div><span>Fav 1:&nbsp;</span><FavStar isFavorite={true}/></div>
        <div><span>Fav 2:&nbsp;</span><FavStar isFavorite={false}/></div>
        <hr />
        <div><span>Rating 0:&nbsp;</span><StarRating rating={0}/></div>
        <div><span>Rating 1:&nbsp;</span><StarRating rating={1}/></div>
        <div><span>Rating 2:&nbsp;</span><StarRating rating={2}/></div>
        <div><span>Rating 3:&nbsp;</span><StarRating rating={3}/></div>
        <div><span>Rating 4:&nbsp;</span><StarRating rating={4}/></div>
        <div><span>Rating 5:&nbsp;</span><StarRating rating={5}/></div>
      </div>
    );
  }
}

export default class DemoPage extends Component<{}, {}, {}> {
  render(): ?ReactElement {
    const queryParam = parseQueryString(window.location.search);
    const mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return <DetailPage />;
    } else if (mode == "2") {
      return <ItemHintsOrList elementType='person' itemList={DemoData.NAMES_1} />;
    } else if (mode == "3") {
      return <ItemHintsOrList elementType='person' nameParts={DemoData.NAME_HINTS_1} />;
    } else if (mode == "4") {
      return <CatalogList items={DemoData.CATALOG_LIST} />;
    } else if (mode == "5") {
      return <GenericCatalogItemDetails isFavorite={true} item={DemoData.FAR_RAINBOW} />;
    } else if (mode == "loading") {
      return <LoadingPage target={"demo"} />;
    } else if (mode == "eolaireApi") {
      return <EolaireApiConsoleView />;
    } else if (mode == "catalogAdapterApi") {
      return <CatalogAdapterApiConsoleView />;
    } else if (mode == "demoControls") {
      return <DemoControlsPage />;
    }

    return (
      <div className="container">
        <ul>
          <li><a href="/?mode=1#/demo">Detail Page</a></li>
          <li><a href="/?mode=2#/demo">Person Names List</a></li>
          <li><a href="/?mode=3#/demo">Person Hints List</a></li>
          <li><a href="/?mode=4#/demo">Catalog List</a></li>
          <li><a href="/?mode=5#/demo">Generic Catalog Item Details</a></li>
          <li><a href="/?mode=loading#/demo">Loading Page</a></li>
          <li><a href="/?mode=demoControls#/demo">Demo Controls</a></li>
          <li><a href="/?mode=eolaireApi#/demo">Eolaire API</a></li>
          <li><a href="/?mode=catalogAdapterApi#/demo">Catalog Adapter API</a></li>
        </ul>
      </div>
    );
  }
}

