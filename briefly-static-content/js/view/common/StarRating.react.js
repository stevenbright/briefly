
'use strict';

import React, {Component} from 'react';

export default class StarRating extends Component<{}, Props, {}> {
  render(): ?ReactElement {
    return (
      <span className="star-rating">
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
        <span className="glyphicon glyphicon-star" ariaHidden="true"/>
      </span>
    );
  }
}
