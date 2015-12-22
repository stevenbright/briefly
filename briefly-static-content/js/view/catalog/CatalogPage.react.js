'use strict';

import React, {Component} from 'react';
import LoadingPage from '../common/LoadingPage.react';

import CatalogAdapterService from '../../service/CatalogAdapterService';

export default class CatalogPage extends Component<{},
  /* Props */{ },
  /* State */{ loading: boolean, items: array, offsetToken: ?string }> {

  state = {
    loading: true,
    items: [],
    offsetToken: null
  }

  componentDidMount(): void {
    this._fetch("book", null, 10);
  }

  render(): ?ReactElement {
    if (this.state.loading) {
      return <LoadingPage target="Catalog" />;
    }

    const itemStr = JSON.stringify(this.state.items);

    return (
      <div className="container">
        <h2>Catalog Page</h2>
        <hr/>
        <p>offsetToken: {this.state.offsetToken}</p>
        <p>itemStr: {itemStr}</p>
      </div>
    );
  }

  _fetch(itemType: string, offsetToken: ?string, limit: number): void {
    const p = CatalogAdapterService.getItemByType(itemType, offsetToken, limit);
    p.then((response) => this.setState({items: response.items, offsetToken: response.offsetToken, loading: false}));
  }
}
