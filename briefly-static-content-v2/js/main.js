import ViewDispatcher from './view/ViewDispatcher';

import {parseQueryString} from './util/uri';
import ajax from 'rsvp-ajax';

import $ from 'jquery';

function installDebugHooks() {
  console.log("Installing Debug Hooks...");

  // install AJAX interceptor
  ajax.on(ajax.XHR_ERROR, function (xmlHttpRequest) {
    window["lastErrorXhr"] = xmlHttpRequest;
    console.error("AJAX error; status:", xmlHttpRequest.status, xmlHttpRequest.statusText,
      "responseURL:", xmlHttpRequest.responseURL, "requestId:", xmlHttpRequest.getResponseHeader("X-Rid"));
  });
}

window.onload = function () {
  const queryParam = parseQueryString(window.location.search);
  if (queryParam["debug"] === "1") {
    installDebugHooks();
  }

  const viewDispatcher = new ViewDispatcher();
  viewDispatcher.render($('main-content'));
}
