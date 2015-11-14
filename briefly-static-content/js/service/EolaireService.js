'use strict';

import ajax from 'rsvp-ajax';
import cache from 'rsvp-cache';
import {Promise} from 'rsvp';

import {DEFAULT_LIMIT} from '../util/AppConstants';

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

  getEntityList(offsetToken: string, limit: number): Promise {
    const request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
    return ajax.request("POST", "/rest/eolaire/entity/list", request);
  }

  getItemById(id: number): Promise {
    return ajax.request("GET", "/rest/eolaire/item/entry/" + id);
  }

  getItemProfile(id: number): Promise {
    return ajax.request("GET", "/rest/eolaire/item/profile/" + id);
  }

  getItemByType(itemTypeId: number, offsetToken: string, limit: number): Promise {
    const request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
    request.itemTypeId = itemTypeId;
    return ajax.request("POST", "/rest/eolaire//item/query/by-type", request);
  }
};

export default new EolaireService();
