'use strict';

import React, {Component} from 'react';

import LoadingPage from '../common/LoadingPage.react';

import CatalogAdapterService from '../../service/CatalogAdapterService';

export default class GenericDetailPage extends Component<{},
  /*Props*/{ itemId: number, itemType: string },
  /*State*/{}> {

  state = {
    loading: true,
    itemDetails: null
  }

  componentDidMount(): void {
    this._fetch(this.props);
  }

  componentWillReceiveProps(nextProps): void {
    this._fetch(nextProps);
  }

  render(): ?ReactElement {
    if (this.state.loading) {
      return <LoadingPage target="Item Details" />;
    }

    const details = this.state.itemDetails;
    console.log("details", details);

    let profileUi;
    if (details.profile != null) {
      const createdStr = details.profile.created.toDateString();
      const updatedStr = details.profile.updated.toDateString();

      profileUi = (
        <div>
          <hr/>
          <p>Created: {createdStr}</p>
          <p>Updated: {updatedStr}</p>
        </div>);
    } else {
      profileUi = (<div/>);
    }

    return (
      <div className="container">
        <h2>Detail Page</h2>
        <hr/>
        <p>Item: {details.name}</p>
        <p>Type: {details.type}</p>
        {profileUi}
      </div>
    );
  }

  _fetch(props): void {
      console.log("About to fetch catalog items", props);
      const itemId = props.itemId;
      const itemType = props.itemType;

      const p = CatalogAdapterService.getItem(itemId);
      p.then(
        (response) => this.setState({ itemDetails: response, loading: false }),
        (err) => console.log("Error:", err));
    }
}

