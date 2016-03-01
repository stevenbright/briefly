'use strict';

import React, {Component} from 'react';

export default class GenericDetailPage extends Component<{},
  /*Props*/{ itemId: number, itemType: string },
  /*State*/{}> {

  render(): ?ReactElement {
    return (
      <div className="container">
        <h2>Detail Page</h2>
        <hr/>
        <p>Item: {this.props.itemId}, Type: {this.props.itemType}</p>
      </div>
    );
  }
}

