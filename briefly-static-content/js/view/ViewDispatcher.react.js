var React = require('react');
var Router = require('director').Router;

// widgets

var StorefrontPage = require('./storefront/StorefrontPage.react');
var AboutPage = require('./about/AboutPage.react');
var DemoPage = require('./demo/DemoPage.react');

// navigation IDs

var Nav = {
  UNDEFINED: "UNDEFINED",

  STOREFRONT: "STOREFRONT",

  DEMO: "DEMO",

  ABOUT: "ABOUT"
};

function setStartTitle(pageNamePart) {
  if (pageNamePart != null) {
    document.title = "Briefly \u00BB " + pageNamePart;
    return;
  }

  document.title = "Briefly \u00BB Loading...";
}

var TitleService = {
  setTitle: setStartTitle
}

module.exports = React.createClass({
  getInitialState: function () {
    var services = { titleService: TitleService };
    for (var serviceKey in this.props.services) {
      services[serviceKey] = this.props.services[serviceKey];
    }

    return {
      services: services,

      nowShowing: Nav.UNDEFINED, // current widget

      // controller variables

      type: undefined,
      offsetToken: undefined,
      limit: undefined
    };
  },

  componentDidMount: function () {
    var gotoStorefrontPage = this.setState.bind(this, {nowShowing: Nav.STOREFRONT});
    var gotoAboutPage = this.setState.bind(this, {nowShowing: Nav.ABOUT});

    // TODO: disable in prod
    var gotoDemoPage = this.setState.bind(this, {nowShowing: Nav.DEMO});

    var router = Router({
      '/storefront': gotoStorefrontPage,
      '/demo': gotoDemoPage,
      '/about': gotoAboutPage
    });

    router.init('/storefront');
  },

  render: function() {
    switch (this.state.nowShowing) {
      case Nav.UNDEFINED: // happens once on loading
        setStartTitle("Main");
        return (<div/>);

      case Nav.STOREFRONT:
        setStartTitle("Storefront");
        return (<StorefrontPage services={this.state.services}/>);

      case Nav.ITEM_BY_TYPE_LIST:
        setStartTitle("Items");
        return (<ItemByTypeListPage
                  services={this.state.services}
                  type={this.state.type}
                  offsetToken={this.state.offsetToken}
                  limit={this.state.limit}
                  />);

      case Nav.ABOUT:
        setStartTitle("About");
        return (<AboutPage />);

      case Nav.DEMO: // should be inactive in prod
        setStartTitle("Demo");
        return (<DemoPage />);

      default:
        setStartTitle();
        return (<EntityListPage services={this.state.services}/>);
    }
  }
});

