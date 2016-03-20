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
    //console.log("details", details);

    const profileUi = this._getProfileUi(details);
    const genres = this._getRelatedReferenceListElements(details.relations, "genre", "Genres");
    const authors = this._getRelatedReferenceListElements(details.relations, "author", "Authors");
    const languages = this._getRelatedReferenceListElements(details.relations, "language", "Languages");

    return (
      <div className="container">
        <h2>Detail Page</h2>
        <hr/>
        <p>ID: {details.id}</p>
        <p>Item: {details.name}</p>
        <p>Type: {details.type}</p>
        {genres}
        {languages}
        {authors}
        {profileUi}
      </div>
    );
  }

  _getProfileUi(details): ReactElement {
    let profileUi;
    if (details.profile != null) {
      const p = details.profile;
      const createdStr = p.created.toDateString();
      const updatedStr = p.updated.toDateString();

      const libId = "libId" in p.metadata ? (<p>Lib ID: {p.metadata.libId}</p>) : (<span/>);
      const libAdded = "libAdded" in p.metadata ? (<p>Lib Added: {p.metadata.libAdded.toGMTString()}</p>) : (<span/>);
      const libSize = "libSize" in p.metadata ? (<p>Lib Size: {p.metadata.libSize}</p>) : (<span/>);
      const seriesPos = "seriesPos" in p.metadata ? (<p>Series #: {p.metadata.seriesPos}</p>) : (<span/>);

      profileUi = (
        <div>
          <hr/>
          <p>Created: {createdStr}</p>
          <p>Updated: {updatedStr}</p>
          {libId}
          {libAdded}
          {libSize}
          {seriesPos}

          <p>/Download Button/</p>
        </div>);
    } else {
      profileUi = (<div/>);
    }

    return profileUi;
  }

  _getRelatedReferenceListElements(relations, typeNameFilter, readableTypeName): ReactElement {
    const elements = relations.filter((rel) => (rel.type === typeNameFilter)).map((rel) => {
      const itemDetailPageUrl = '#/item/' + rel.target.id;
      return (<a key={rel.target.id} href={itemDetailPageUrl} title={rel.target.name}>{rel.target.name}</a>);
    });

    if (elements.length === 0) {
      return (<span/>);
    }

    return (<p><span>{readableTypeName}:&nbsp;</span><span>{elements}</span></p>);
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

