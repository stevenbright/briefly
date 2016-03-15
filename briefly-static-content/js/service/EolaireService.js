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

function toUrl(path) {
  return "/rest/eolaire" + path;
}

class EolaireService {

  getEntityList(offsetToken: string, limit: number): Promise {
    const request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
    return ajax.request("POST", toUrl("/entity/list"), request);
  }

  getItemById(id: number): Promise {
    return ajax.request("GET", toUrl("/item/entry/" + id));
  }

  getItemProfile(id: number): Promise {
    return ajax.request("GET", toUrl("/item/profile/" + id));
  }

  getItemByType(itemTypeId: number, offsetToken: string, limit: number): Promise {
    const request = prepareRequestWithOffsetAndLimit(offsetToken, limit);
    request.itemTypeId = itemTypeId;
    return ajax.request("POST", toUrl("/item/query/by-type"), request);
  }

  getItemRelations(itemId: number, filterMode: string): Promise {
    return ajax.request("POST", toUrl("/item/relations"), {
      "itemId": itemId,
      "relationsFilterMode": filterMode
    });
  }
};

export default new EolaireService();
