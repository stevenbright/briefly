var React = require('react');

var Dispatcher = require('./view/ViewDispatcher.react');
var BrieflyService = require('./service/AjaxBrieflyService');
var parseQueryString = require('./util/uri').parseQueryString;
var cache = require('rsvp-cache');
var ajax = require('rsvp-ajax');


function installDebugHooks() {
  console.log("Installing Debug Hooks...");

  // install AJAX interceptor
  ajax.on(ajax.XHR_ERROR, function (xmlHttpRequest) {
    window["lastErrorXhr"] = xmlHttpRequest;
    console.error("AJAX error; status:", xmlHttpRequest.status, xmlHttpRequest.statusText,
      "responseURL:", xmlHttpRequest.responseURL, "requestId:", xmlHttpRequest.getResponseHeader("X-Rid"));
  });

  // install cache event handlers
  cache.on(cache.CACHE_HIT, function (d) {
    console.log("cacheHit, key:", d.key, ", value:", d.value);
  });

  cache.on(cache.CACHE_MISS, function (d) {
    console.log("cacheMiss, key:", d.key);
  });
}

window.onload = function () {
  var services = {
    brieflyService: new BrieflyService()
  };

  var queryParam = parseQueryString(window.location.search);
  if (queryParam["debug"] === "1") {
    installDebugHooks();
  }

  React.render(React.createElement(Dispatcher, {services: services}),
    document.getElementById('main-content'));
}
