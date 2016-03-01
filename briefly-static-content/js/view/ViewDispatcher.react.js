
'use strict';

import React, {Component} from 'react';
import {Router} from 'director';

// widgets

import StorefrontPage from './storefront/StorefrontPage.react';
import CatalogPage from './catalog/CatalogPage.react';
import GenericDetailPage from './detail/GenericDetailPage.react';
import AboutPage from './about/AboutPage.react';
import DemoPage from './demo/DemoPage.react';

import TitleService from '../service/TitleService';

// navigation IDs

const Nav = {
  UNDEFINED:    "UNDEFINED",
  STOREFRONT:   "STOREFRONT",
  DETAIL:       "DETAIL",
  CATALOG:      "CATALOG",
  DEMO:         "DEMO",
  ABOUT:        "ABOUT"
};


type State = {
  // current widget
  nowShowing: string,

  // controller variables
  type: ?string,
  id: ?number,
  offsetToken: ?number,
  limit: ?number
};

export default class ViewDispatcher extends Component<{}, {}, State> {
  state = {
    nowShowing: Nav.UNDEFINED,

    offsetToken: undefined,
    limit: undefined
  }

  componentDidMount(): void {
    const gotoStorefrontPage = this.setState.bind(this, {nowShowing: Nav.STOREFRONT});
    const gotoCatalogPage = this.setState.bind(this, {nowShowing: Nav.CATALOG});
    const gotoAboutPage = this.setState.bind(this, {nowShowing: Nav.ABOUT});
    const gotoDetailPage = function (type, id) {
      this.setState({nowShowing: Nav.DETAIL, type, id: parseInt(id)});
    }.bind(this);

    // TODO: disable in prod
    const gotoDemoPage = this.setState.bind(this, {nowShowing: Nav.DEMO});

    const router = Router({
      '/storefront': gotoStorefrontPage,
      '/catalog': gotoCatalogPage,
      '/item/:type/:id': gotoDetailPage,
      '/demo': gotoDemoPage,
      '/about': gotoAboutPage
    });

    router.init('/storefront');
  }

  render(): ?ReactElement {
    switch (this.state.nowShowing) {
      case Nav.STOREFRONT:
        TitleService.setTitle("Storefront");
        return (<StorefrontPage />);

      case Nav.CATALOG:
        TitleService.setTitle("Catalog");
        return (<CatalogPage itemType="book" offsetToken={null} limit={null} />);

      case Nav.ABOUT:
        TitleService.setTitle("About");
        return (<AboutPage />);

      case Nav.DETAIL:
        TitleService.setTitle("Item");
        return (<GenericDetailPage itemId={this.state.id} itemType={this.state.type} />);

      case Nav.DEMO: // should be inactive in prod
        TitleService.setTitle("Demo");
        return (<DemoPage />);

      default:
        TitleService.setTitle("Loading...");
        return (<div>Loading...</div>);
    }
  }
}

