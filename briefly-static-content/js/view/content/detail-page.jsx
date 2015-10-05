var React = require('React');

var RetellSmallItem = require('./retell-small-item.js');

module.exports = React.createClass({
  render: function() {
    // Images(or Media), Title, Download Samples + Buy, Overview, Retells
    var itemModel;
    itemModel = {
      title: "The Little Lady of the Big House",
      authors: [{name: "Jack London"}],
      overview: "The Little Lady of the Big House (1915) is a novel by American writer Jack London. Biographer Clarice Stasz states that it is \"not autobiography,\" but speaks of his \"frank borrowing from his life with Charmian\" and says it is \"psychologically valid as a mirror of events during [the] winter [of 1912–13]. The story concerns a love triangle. The protagonist, Dick Forrest, is a rancher with a poetic streak (his \"acorn song\" recalls London's play, \"The Acorn Planters.\"). His wife, Paula, is a vivacious, athletic, and sexually self-aware woman (in one scene, she rides a stallion into a \"swimming tank,\" emerging in \"a white silken slip of a bathing suit that molded to her form like a marble-carven veiling of drapery.\") Paula, like Charmian, is subject to insomnia; and Paula, like Charmian, is unable to bear children. Based on a reading of Charmian's diary, Stasz identifies the third vertex of the triangle, Evan Graham, with two real-life men named Laurie Smith and Allan Dunn. Even minor characters can be identified; Forrest's servant Oh My resembles London's valet Nakata. The long-bearded hobo philosopher Aaron Hancock resembles the real-lifelong-bearded hobo philosopher Frank Strawn-Hamilton, who was a long-term guest at the London ranch. Sculptor Haakan Frolich makes an appearance as \"the sculptor Froelig\" — and painter Xavier Martinez appears as the character \"Xavier Martinez!\"",
      media: {
        image: {
          url: "https://upload.wikimedia.org/wikipedia/en/8/8b/LittleLadyOfTheBigHouse.JPG",
          alt: "LittleLadyOfTheBigHouse.JPG"
        }
      }
    };

    var media = (
      <img alt={itemModel.media.image.alt} src={itemModel.media.image.url} width="100%" />
    );

    var subTitle = (
      <div className="clearfix">
        <p className="pull-left">by <a href="#">Jack London</a>&nbsp;</p>
        <ul className="list-inline pull-right">
          <li><a href="#">Comments</a></li>
          <li><a href="#">Discussion</a></li>
        </ul>
      </div>
    );

    // https://en.wikipedia.org/wiki/The_Little_Lady_of_the_Big_House
    var atf = (
      <div className="row">
        <div className="col-md-3">
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

    var retellItem1 = {
      author: {name: "Edward Morrison"},
      date: 1443005490433,
      brief: "An interesting story about second life of Jack"
    };
    var retellItem2 = {
      author: {name: "Mike Dwait"},
      date: 1444015490433,
      brief: "Another story of a great author"
    };

    var retells = (
      <div className="row">
        <div className="col-md-3"/>
        <div className="col-md-9">
          <h2>Retells</h2>
          <hr/>
          <div>
            <RetellSmallItem model={retellItem1} />
            <RetellSmallItem model={retellItem2} />
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

