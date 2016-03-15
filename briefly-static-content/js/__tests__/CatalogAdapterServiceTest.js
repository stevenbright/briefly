jest.dontMock('../service/CatalogAdapterService.js');
jest.dontMock('rsvp');

import CatalogAdapterService from '../service/CatalogAdapterService.js';
import {Promise} from 'rsvp';

describe('catalog adapter', function () {
  pit('gets item by id', function () {
    // Given:
    // TBD

    // When:
    const result = 1;

    // Then:

    const promise = new Promise(function (resolve) { resolve(); });
    return promise.then(function (data) {
      expect("" + result).toBe("1");
    });
//      .then(function() {
//          expect("" + result).toBe("1");
////          expect(apiMock).toBeCalledWith(creds);
////          expect(dispatcherMock.mock.calls.length).toBe(2);
////          expect(dispatcherMock.mock.calls[0][0]).toEqual({ actionType: Constants.api.user.LOGIN, queryParams: creds, response: Constants.request.PENDING});
////          expect(dispatcherMock.mock.calls[1][0]).toEqual({ actionType: Constants.api.user.LOGIN, queryParams: creds, response: successResponse});
//      });
  });
});