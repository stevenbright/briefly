'use strict';

jest.mock('rsvp-ajax');
jest.unmock('rsvp');
jest.dontMock('../util/AppConstants');
jest.dontMock('../service/EolaireService');

describe('catalog service test', () => {
  let ajax;

  beforeEach(() => {
    ajax = require('rsvp-ajax');
    ajax.__clearMocks();
  });

  it('getEntityList', () => {
    // Given:
    const {default: EolaireService} = require('../service/EolaireService');
    const expectedVal = 100;
    const offsetToken = 'offsetToken-0';
    const limit = 2;
    let capturedRequest = '<request?>';
    ajax.__putMockResponse('POST', '/rest/eolaire/entity/list', request => {
      capturedRequest = request;
      return expectedVal;
    });

    // When:
    let actualVal = '<val?>';
    EolaireService.getEntityList(offsetToken, limit).then(val => { actualVal = val; });
    jest.runAllTimers(); // run all promises

    // Then:
    expect(actualVal).toBe(expectedVal);
    expect(capturedRequest).toEqual({"offsetToken": offsetToken, "limit": limit});
  });

  it('getItemById', () => {
    // Given:
    const {default: EolaireService} = require('../service/EolaireService');
    const expectedVal = 100;
    ajax.__putMockResponse('GET', '/rest/eolaire/item/entry/1', expectedVal);

    // When:
    let actualVal = '<none>';
    EolaireService.getItemById(1).then(val => { actualVal = val; });
    jest.runAllTimers(); // run all promises

    // Then:
    expect(actualVal).toBe(expectedVal);
  });

  it('getItemProfile', () => {
    // Given:
    const {default: EolaireService} = require('../service/EolaireService');
    const expectedVal = 100;
    ajax.__putMockResponse('GET', '/rest/eolaire/item/profile/2', expectedVal);

    // When:
    let actualVal = '<none>';
    EolaireService.getItemProfile(2).then(val => { actualVal = val; });
    jest.runAllTimers(); // run all promises

    // Then:
    expect(actualVal).toBe(expectedVal);
  });

//  it('getItemsByIds', () => {
//    // Given:
//    const {default: EolaireService} = require('../service/EolaireService');
//    const expectedVal = 100;
//    const ids = [1, 2, 3];
//    let capturedData = null;
//    ajax.__putMockResponse('POST', '/rest/eolaire/item/list', (data) => {
//      capturedData = data;
//      return expectedVal;
//    });
//
//    // When:
//    let actualVal = '<none>';
//    EolaireService.getItemsByIds(ids).then(val => { actualVal = val; });
//    jest.runAllTimers(); // run all promises
//
//    // Then:
//    expect(actualVal).toBe(expectedVal);
//    expect(capturedData).toEqual({"itemIds": ids});
//  });

//  it('get items', () => {
//    // Given:
//    const {default: CatalogService} = require('../service/CatalogService');
//    let actualVal = '<none>';
//    const items = [{
//      "id": 1,
//      "name": "First",
//      "genres": ["genre1-1"],
//      "authors": ["author1-1", "author1-2"]
//    }, {
//      "id": 2,
//      "name": "Second",
//      "genres": ["genre2-1", "genre2-2"],
//      "authors": ["author2-1"]
//    }];
//    ajax.__putMockResponse('GET', '/rest/items.json', { "items": [1, 2] });
//    ajax.__putMockResponse('GET', '/rest/item/1.json', items[0]);
//    ajax.__putMockResponse('GET', '/rest/item/2.json', items[1]);
//
//    // When:
//    CatalogService.getItems().then(val => { actualVal = val; });
//    jest.runAllTimers(); // run all promises
//
//    // Then:
//    expect(actualVal).toEqual(items);
//  });
});
