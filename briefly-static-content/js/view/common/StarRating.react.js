
'use strict';

import React, {Component} from 'react';

//
// Helper functions
//

function getRatingFromDOMEvent(e, props) {
  const star = e.target;
  const allStars = Array.prototype.slice.call(e.currentTarget.childNodes, 0);
  const index = allStars.indexOf(star);

  let rating = props.total - index;
  let limit = Number(props.limit);

  limit = (props.limit === void 0) ? props.total: limit
  rating = rating < limit? rating: limit;

  return Number(rating);
}

//
// Helper subcomponent
//

var Star = React.createClass({
  getDefaultProps: function () {
    return { isActive: false, isDisabled: false }
  },

  render: function () {
    let className = this.props.isActive? 'is-active': '';
    className += this.props.isDisabled? ' is-disabled': '';

    return <a className={className}>&#9733;</a>;
  }
});

//
// StarRating component
//

var StarRating = React.createClass({

  getInitialState: function() {
    return {
      lastRating: this.props.rating,
      rating: this.props.rating
    }
  },

  getDefaultProps: function() {
    return { total: 5, rating: 0 };
  },

  componentDidMount: function() {
    this.setState({ rating: this.props.rating });
  },

  render: function () {
    let total = Number(this.props.total);
    let limit = Number(this.props.limit);
    const rating = Number(this.state.rating);

    limit = (this.props.limit === void 0) ? total : limit;

    const nodes = Array(total).join(',').split(',').map(function (_, i) {
      const isActive = (i >= total - rating);
      const isDisabled = (i < total - limit);
      return <Star key={i} isActive={isActive} isDisabled={isDisabled} />;
    }.bind(this));

    return (
      <div
        className="star-rating"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onMouseMove={this._handleMouseMove}
        onClick={this._handleClick}>{nodes}
      </div>
    );
  },
  
  //
  // StarRating Private
  //
 
  _handleMouseEnter: function () {
    this.setState({ rating: 0 });
  },

  _handleMouseMove: function(e) {
    const rating = getRatingFromDOMEvent(e, this.props);
    const callback = this.props.onRate;

    callback && callback(rating);
  },

  _handleMouseLeave: function () {
    const callback = this.props.onRate;
    const state = this.state;

    if (state.rating === 0) {
      callback && callback(state.lastRating);
      this.setState({ rating: state.lastRating });
    }
  },

  _handleClick: function (e) {
    const rating = getRatingFromDOMEvent(e, this.props);
    const lastRating = Number(this.state.lastRating);
    const callback = this.props.onRate;

    if (e.target.getAttribute('class').indexOf('is-disabled') > -1) {
      return;
    }

    this.setState({ lastRating: rating, rating: rating });
    callback && callback(rating, lastRating);
  }
});

module.exports = StarRating;
