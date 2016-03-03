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


    let paginationUi;
    if (this.state.offsetToken != null) {
      paginationUi = (
        <div className="container">
          <button className="btn btn-default" onClick={this._handleLoadMoreButtonClick}>Load More...</button>
          <hr/>
        </div>);
    } else {
      paginationUi = (<div><hr/></div>);
    }

    return (
      <div>
        <div className="container">
          <h2>Catalog Page</h2>
          <hr/>
          <CatalogList items={this.state.items} />
        </div>
        {paginationUi}
      </div>
    );
  }

  //
  // Private
  //

  _handleLoadMoreButtonClick = (event) => {
    this._fetch({
      itemType: this.props.itemType,
      offsetToken: this.state.offsetToken,
      limit: this.props.limit
    });
  }

  _fetch(props): void {
    const itemType = props.itemType;
    const offsetToken = props.offsetToken || null;
    const limit = props.limit || 10;
    console.log("Params: ", itemType, offsetToken, limit);
    const p = CatalogAdapterService.getItemByType(itemType, offsetToken, limit);
    p.then(
      (response) => this.setState({
        items: this.state.items.concat(response.items),
        offsetToken: response.offsetToken,
        loading: false
      }),
      (err) => console.log("Error:", err));
  }
}
