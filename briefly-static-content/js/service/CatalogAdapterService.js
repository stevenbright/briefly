'use strict';

import EolaireService from './EolaireService';
import {Promise, all} from 'rsvp';

import {DEFAULT_LIMIT} from '../util/AppConstants';

function logInfo() {
  //return console.log.apply(console, arguments);
}

class CatalogAdapterService {

  constructor() {
    this.entityTypes = null;
  }

  getAllEntityTypes(): Promise {
    if (this.entityTypes != null) {
      return new Promise((resolve, _) => { resolve(this.entityTypes); });
    }

    return this._getNextEntityTypesChunk(null, null, {}, DEFAULT_LIMIT /*2*/);
  }

  getItemByType(type, offsetToken, limit): Promise {
    let promise = this.getAllEntityTypes();

    // [1] Get entity types
    promise = promise.then((response) => {
      logInfo("Get entity types", response);
      return new Promise((resolve, _) => { resolve(response); });
    });

    // [2] Get item IDs
    promise = promise.then((response) => {
      logInfo("Get item IDs", response);
      if (!(type in response)) {
        return new Promise((_, reject) => { reject({message: "Unknown type=" + type}); });
      }

      const typeId = response[type];
      return EolaireService.getItemByType(typeId, offsetToken, limit);
    });

    // [3] Get item type
    promise = promise.then((response) => {
      logInfo("Get item type", response);
      const ids = response["itemIds"];
      const newOffsetToken = response["offsetToken"];
      if (ids.length > 0) {
        // map items
        const itemPromises = ids.map((itemId) => EolaireService.getItemById(itemId).then((item) => {
          const p = EolaireService.getItemProfile(itemId);
          return p.then((itemProfile) => {
            logInfo("itemProfile", itemProfile, "item", item);
            const itemModel = {
              id: item["id"],
              type,
              name: item["name"],
              profile: null
            };
            if ("profile" in itemProfile && itemProfile["profile"] != null) {
              const p = itemProfile["profile"];
              itemModel.profile = {
                description: p["description"],
                created: new Date(p["created"]),
                updated: new Date(p["updated"]),
                metadata: new Date(p["metadata"])
              };
            }
            return itemModel;
          });
        }));
        return all(itemPromises).then((response) => {
          return {
            items: response,
            offsetToken: newOffsetToken
          };
        });
      }

      return new Promise((resolve, _) => { resolve({items: [], type, offsetToken: null}); });
    });

    return promise;
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

    //logInfo("_getNextEntityTypesChunk ", {response, offsetToken, entityTypesHolder, limit});

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
