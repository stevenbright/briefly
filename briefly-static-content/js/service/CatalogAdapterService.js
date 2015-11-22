'use strict';

import EolaireService from './EolaireService';
import {Promise} from 'rsvp';

import {DEFAULT_LIMIT} from '../util/AppConstants';

class CatalogAdapterService {

  constructor() {
    this.entityTypes = null;
  }

  getAllEntityTypes(): Promise {
    if (this.entityTypes != null) {
      return new Promise((resolve, _) => { resolve(this.entityTypes); })
    }

    return this._getNextEntityTypesChunk(null, null, {}, DEFAULT_LIMIT /*2*/);
  }

  //
  // Private
  //

  _getNextEntityTypesChunk(response, offsetToken, entityTypesHolder, limit): Promise {
    if (response != null) {
      response["types"].map(({id, name}) => {
        entityTypesHolder[name] = id;
      });
    }

    //console.log("_getNextEntityTypesChunk ", {response, offsetToken, entityTypesHolder, limit});

    if ((response == null) || ("offsetToken" in response)) {
      let promise = EolaireService.getEntityList(offsetToken, limit);
      promise = promise.then((r) => {
        return this._getNextEntityTypesChunk(r, r["offsetToken"] || null, entityTypesHolder, limit);
      });
      return promise;
    }

    return new Promise((resolve, _) => {
      this.entityTypes = entityTypesHolder;
      resolve(entityTypesHolder);
    });
  }
}

export default new CatalogAdapterService();
