'use strict';

import EolaireService from './EolaireService';
import {Promise, all} from 'rsvp';

import {DEFAULT_LIMIT} from '../util/AppConstants';

function logInfo() {
  //return console.log.apply(console, arguments);
}

function convertMetadata(metadata) {
  let result = {};
  for (let i = 0; i < metadata.entries.length; ++i) {
    const entry = metadata.entries[i];
    if (entry.key === 'fileSize') {
      result.fileSize = entry["value"]["intValue"];
    }
  }
  return result;
}

function mapProfile(profile) {
  // sample entry: {"profile":{"itemId":85331,"description":"","created":1440423447843,"updated":1440423447843,"flags":1,"metadata":{"entries":[]}}}
  if (!("profile" in profile)) {
    return null;
  }

  const p = profile["profile"];
  if (p == null) {
    return null;
  }

  return {
    description: p["description"],
    created: new Date(p["created"]),
    updated: new Date(p["updated"]),
    metadata: convertMetadata(p["metadata"])
  };
}

function getItemTypeById(entityTypes /*Array<{string(type): number(id)}>*/, itemTypeId /*number*/) {
  for (let entityNameKey in entityTypes) {
    if (entityTypes.hasOwnProperty(entityNameKey)) {
      const entityTypeId = entityTypes[entityNameKey];
      if (entityTypeId === itemTypeId) {
        return entityNameKey;
      }
    }
  }

  return "unknown";
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

  getItem(id): Promise {
    const itemByIdPromise = EolaireService.getItemById(id);
    const itemProfilePromise = EolaireService.getItemProfile(id);
    const allEntityTypesPromise = this.getAllEntityTypes();

    let promise = all([itemByIdPromise, itemProfilePromise, allEntityTypesPromise]).then((response) => {
      logInfo("Get item ID+Profile", response);
      const item = response[0];
      const profile = response[1];
      const entityTypes = response[2];

      let itemProfile = {
        id: item["id"],
        name: item["name"],
        type: getItemTypeById(entityTypes, item["itemTypeId"]),
        profile: mapProfile(profile)
      };

      return new Promise((resolve, _) => { resolve(itemProfile); });
    });

    return promise;
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
            return {
              id: item["id"],
              type,
              name: item["name"],
              profile: mapProfile(itemProfile),
              relatedItems: []
            };
          });
        }));

        // Final result
        return all(itemPromises).then((response) => {
          return { items: response, offsetToken: newOffsetToken };
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
