'use strict';

var ajax = require('rsvp-ajax');
var cache = require('rsvp-cache');
var rsvp = require('rsvp');

var AppConstants = require('../util/AppConstants');
var DEFAULT_LIMIT = AppConstants.DEFAULT_LIMIT;

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

class EolaireService {

  getEntityList(offsetToken: string, limit: number): void {
    var request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
    return ajax.request("POST", "/rest/eolaire/entity/list", request);
  }
};

export default new EolaireService();
