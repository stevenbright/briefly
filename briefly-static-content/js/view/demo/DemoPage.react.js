var React = require('react');

// page to be demo'ed:
var DetailPage = require('../catalog/DetailPage.react');
var CatalogList = require('../catalog/CatalogList.react');
var GenericCatalogItemDetails = require('../catalog/GenericCatalogItemDetails.react');

var PersonHintsList = require('../person/PersonHintsList.react');

// parsing query
var parseQueryString = require('../../util/uri.js').parseQueryString;

import CatalogItem from '../../model/catalog/Item';

import DemoData from '../../service/DemoData';

module.exports = React.createClass({
  render: function() {
    var queryParam = parseQueryString(window.location.search);
    var mode = ("mode" in queryParam ? queryParam["mode"] : "default");

    if (mode == "1") {
      return (<DetailPage />);
    } else if (mode == "2") {
      return (<PersonHintsList personList={DemoData.NAMES_1} />);
    } else if (mode == "3") {
      return (<PersonHintsList nameParts={DemoData.NAME_HINTS_1} />);
    } else if (mode == "4") {
      return <CatalogList items={DemoData.CATALOG_LIST} />;
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

