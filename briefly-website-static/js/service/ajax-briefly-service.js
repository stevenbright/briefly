var ajax = require('rsvp-ajax');
var cache = require('rsvp-cache');
var rsvp = require('rsvp');
var DEFAULT_LIMIT = require('../util/constants.js').DEFAULT_LIMIT;

function prepareRequestWithOffsetAndLimit(offsetToken, limit) {
  limit = limit || DEFAULT_LIMIT;

  var request = {
    "limit": limit
  };

  if (offsetToken) {
    request["offsetToken"] = offsetToken;
  }

  return request;
}

//
// Service
//

function AjaxBrieflyService() {
  this.cache = {
  };
}

AjaxBrieflyService.prototype.getItemsByIds = function (ids) {
  return ajax.request("POST", "/rest/eolaire/item/list", {"itemIds": ids});
}

AjaxBrieflyService.prototype.getAllEntities = function (offsetToken, limit) {
  var request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
  return ajax.request("POST", "/rest/eolaire/entity/list", request);
}

AjaxBrieflyService.prototype.getItemListByType = function (type, offsetToken, limit) {
  var request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
  request["itemTypeId"] = type;

  var promise = ajax.request("POST", "/rest/eolaire/item/query/by-type", request);

  promise = promise.then(function (response) {
    var inner = this.getItemsByIds(response["itemIds"]);
    return inner.then(function (innerResponse) {
      return {
        "offsetToken": response["offsetToken"],
        "items": innerResponse["items"]
      }
    });
  }.bind(this));

  return promise;
}

//
// exports
//

if (window.location.href.startsWith("file")) {
  var s = function StubService() {};
  var p = AjaxBrieflyService.prototype; // use original service
  for (var m in p) {
    if (p.hasOwnProperty(m)) {
      s[m] = function () {
        return new rsvp.Promise(function (resolve) {
          resolve({});
        });
      };
    }
  }

  module.exports.BrieflyService = s;
} else {
  module.exports.BrieflyService = AjaxBrieflyService;
}
