var React = require('react');

// page to be demo'ed:
var DetailPage = require('../catalog/DetailPage.react');
var CatalogList = require('../catalog/CatalogList.react');
var GenericCatalogItemDetails = require('../catalog/GenericCatalogItemDetails.react');

var PersonHintsList = require('../person/PersonHintsList.react');

// parsing query
var parseQueryString = require('../../util/uri.js').parseQueryString;

import CatalogItem from "../../model/catalog/Item";


var DemoData = {
  FAR_RAINBOW: {
    id: 3097,
    name: "Far Rainbow",
    type: "book",
    relatedItems: {
      author: [{id: 1052, name: "Arkady Strugatsky", type: "person"}, {id: 1053, name: "Boris Strugatsky", type: "person"}],
      language: [{id: 11, name: "ru", type: "language"}],
      genre: [{id: 98710, name: "fiction", type: "genre"}]
    }
  }
};

module.exports = React.createClass({
  render: function() {
    var queryParam = parseQueryString(window.location.search);
    var mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return (<DetailPage />);
    } else if (mode == "2") {
      var model = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 3, name: "Cavin"}, {id: 4, name: "Eva"}];
      return (<PersonHintsList personList={model} />);
    } else if (mode == "3") {
      var model = ["Ba", "Be", "Bo"];
      return (<PersonHintsList nameParts={model} />);
    } else if (mode == "4") {
      var model = [
        {
          id: 1029,
          name: "A Christmas Carol",
          type: "book",
          relatedItems: {
            author: [{id: 5097, name: "Charles Dickens", type: "person"}],
            illustrator: [{id: 6970, name: "Sam Golding", type: "person"}, {id: 7041, name: "George Irwing", type: "person"}],
            language: [{id: 12, name: "en", type: "language"}],
            genre: [{id: 98710, name: "fiction", type: "genre"}, {id: 40125, name: "classic", type: "genre"}]
          }
        },
        DemoData.FAR_RAINBOW,
        {
          id: 3078,
          name: "Spanish-Chinese Dictionary",
          type: "book",
          relatedItems: {
            author: [{id: 6512, name: "Miguel De Cervantes", type: "person"}],
            language: [{id: 31, name: "es", type: "language"}, {id: 45, name: "cn", type: "language"}],
            genre: [{id: 97142, name: "dictionary", type: "genre"}]
          }
        }
      ];
      return <CatalogList items={model} />;
    } else if (mode == "5") {
      return (<GenericCatalogItemDetails isFavorite={true} item={DemoData.FAR_RAINBOW} />);
    }

    return (
      <div className="container">
        <ul>
          <li><a href="/?mode=1#/demo">Detail Page</a></li>
          <li><a href="/?mode=2#/demo">Person Names List</a></li>
          <li><a href="/?mode=3#/demo">Person Hints List</a></li>
          <li><a href="/?mode=4#/demo">Catalog List</a></li>
          <li><a href="/?mode=5#/demo">Generic Catalog Item Details</a></li>
        </ul>
      </div>
    );
  }
});

