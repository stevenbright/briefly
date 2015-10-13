var React = require('React');

var FavoriteActionCreators = require('../../action/FavoriteActionCreators')

module.exports = React.createClass({

  propTypes: { // IMPORTANT: type checking
    id: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    isFavorite: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      isFavorite: this.props.isFavorite
    };
  },

  render: function () {
    var favLinkClass = "j-fav-link";
    if (this.state.isFavorite) {
      favLinkClass += " fav";
    }

    return (
      <a className={favLinkClass} href="#" onClick={this._onClick}>
        <span className="star"><span className="glyphicon glyphicon glyphicon-star" aria-hidden="true"></span>&nbsp;Unstar</span>
        <span className="unstar"><span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="true"></span>&nbsp;Star</span>
      </a>
    );
  },

  _onClick: function () {
    var newFavStatus = true;
    if (this.state.isFavorite === true) {
      newFavStatus = false;
    }

    FavoriteActionCreators.set(this.props.id, this.props.type, newFavStatus);

    var isFavorite = newFavStatus;
    this.setState({isFavorite: isFavorite});
  }
});

