import React from 'react';

import StarRating from '../common/StarRating.react';

module.exports = React.createClass({

  render: function() {
    var m = this.props.model;
    var d = new Date(m.date);
    var dateStr = d.toDateString();
    return (
      <div className="retell-entry">
        <div className="clearfix">
          <p className="pull-left">by <a href="#">{m.author.name}</a> posted at {dateStr}</p>
          <p className="pull-right">
            <StarRating/>
          </p>
        </div>
        <p>{m.brief}</p>
      </div>
    );
  }
});
