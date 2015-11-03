var React = require('react');

var RetellReferenceItem = require('../retell/RetellReferenceItem.react');
var FavStar = require('../common/FavStar.react');

module.exports = React.createClass({
  render: function() {
    //
    // Model
    //

    // Images(or Media), Title, Download Samples + Buy, Overview, Retells
    var itemModel;
    itemModel = {
      title: "A Christmas Carol",
      authors: [{id: 1, name: "Charles Dickens"}/*, {id: 2, name: "John Brown"}*/],
      overview: "A Christmas Carol is a novella by Charles Dickens, first published in London by Chapman & Hall on 19 December 1843.[1] The novella met with instant success and critical acclaim. A Christmas Carol tells the story of a bitter old miser named Ebenezer Scrooge and his transformation into a gentler, kindlier man after visitations by the ghost of his former business partner Jacob Marley and the Ghosts of Christmases Past, Present and Yet to Come.",
      media: {
        image: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Charles_Dickens-A_Christmas_Carol-Cloth-First_Edition_1843.jpg/314px-Charles_Dickens-A_Christmas_Carol-Cloth-First_Edition_1843.jpg",
          alt: "A_Christmas_Carol-Cloth-First_Edition_1843.jpg"
        }
      }
    };

    var retellItem1 = {
      author: {name: "Edward Morrison"},
      date: 1443005490128,
      brief: "An excellent christmas tale!"
    };
    var retellItem2 = {
      author: {name: "Mike Dwait"},
      date: 1444015490433,
      brief: "Another story of a great author"
    };

    //
    // Render
    //

    var media = (
      <img alt={itemModel.media.image.alt} src={itemModel.media.image.url} width="100%" />
    );

    var personNodes = itemModel.authors.map(function (person) {
      return (<a key={person.id} href="#">{person.name}</a>);
    });

    var subTitle = (
      <div className="clearfix">
        <p className="pull-left">by {personNodes}</p>
        <ul className="list-inline pull-right">
          <li><a href="#">Comments</a></li>
          <li><a href="#">Discussion</a></li>
        </ul>
      </div>
    );

    var atf = (
      <div className="row">
        <div className="col-md-3">
          <FavStar id={this.props.personId} type='person' isFavorite={true}/>
          {media}
        </div>
        <div className="col-md-7">
          <h2>{itemModel.title}</h2>
          {subTitle}
          <div>
            <p>{itemModel.overview}</p>
          </div>
        </div>
        <div className="col-md-2">
          <div className="well">
            <p>Buy at X</p>
            <p>Buy at Y</p>
            <p>Buy at Z</p>
            <hr/>
            <p><a href="#">Download Sample</a></p>
          </div>
        </div>
      </div>
    );

    var retells = (
      <div className="row">
        <div className="col-md-3"/>
        <div className="col-md-9">
          <h2>Retells</h2>
          <hr/>
          <div>
            <RetellReferenceItem model={retellItem1} />
            <RetellReferenceItem model={retellItem2} />
          </div>
        </div>
      </div>
    );

    return (
      <div className="container-fluid">
        {atf}
        {retells}
      </div>
    );
  }
});

