'use strict';

import React, {Component} from 'react';
import LoadingPage from '../common/LoadingPage.react';
import CatalogList from './CatalogList.react';

import CatalogAdapterService from '../../service/CatalogAdapterService';

export default class CatalogPage extends Component<{},
  /* Props */{ itemType: string, offsetToken: ?string, limit: ?number },
  /* State */{ loading: boolean, items: array, offsetToken: ?string }> {

  state = {
    loading: true,
    items: [],
    offsetToken: null
  }

  componentDidMount(): void {
    this._fetch(this.props);
  }

  componentWillReceiveProps(nextProps): void {
    this._fetch(nextProps);
  }

  render(): ?ReactElement {
    if (this.state.loading) {
      return <LoadingPage target="Catalog" />;
    }

    const itemStr = JSON.stringify(this.state.items);

    console.log("Rendering actual item list=", this.state.items);

    return (
      <div className="container">
        <h2>Catalog Page</h2>
        <hr/>
        <CatalogList items={this.state.items} />
        <hr/>
        <p>offsetToken: {this.state.offsetToken}</p>
        <p>itemStr: {itemStr}</p>
      </div>
    );
  }

  //
  // Private
  //

  _fetch(props): void {
    console.log("About to fetch catalog items", props);
    const itemType = props.itemType;
    const offsetToken = props.offsetToken || null;
    const limit = props.limit || 10;
    console.log("Params: ", itemType, offsetToken, limit);
    const p = CatalogAdapterService.getItemByType(itemType, offsetToken, limit);
    p.then((response) => this.setState({items: response.items, offsetToken: response.offsetToken, loading: false}),
      (err) => console.log("Error:", err));
  }
}
