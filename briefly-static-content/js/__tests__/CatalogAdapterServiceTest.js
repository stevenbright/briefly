jest.dontMock('../service/CatalogAdapterService');
jest.dontMock('rsvp');

import CatalogAdapterService from '../service/CatalogAdapterService';
//import rsvp from 'rsvp';
var rsvp = require('rsvp');

describe('catalog adapter', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });

  pit('should also pass', () => {
    let promise = new rsvp.Promise((resolve, _) => {
      console.log("BBB");
      resolve(1);
    });
    promise = promise.then((data) => {
      console.log("AAA");
      expect(data).toBe(1);
    });

    console.log("promise=", promise);

    return promise;
  });

//  pit('gets item by id', function () {
//    // Given:
//    // TBD
//
//    // When:
//    const result = 1;
//
//    // Then:
//
//    return new Promise(function (resolve) { resolve(); });
//
//    const promise = new Promise(function (resolve) { resolve(); });
//    return promise.then(function (data) {
//      expect("" + result).toBe("1");
//    });
////      .then(function() {
////          expect("" + result).toBe("1");
//////          expect(apiMock).toBeCalledWith(creds);
//////          expect(dispatcherMock.mock.calls.length).toBe(2);
//////          expect(dispatcherMock.mock.calls[0][0]).toEqual({ actionType: Constants.api.user.LOGIN, queryParams: creds, response: Constants.request.PENDING});
//////          expect(dispatcherMock.mock.calls[1][0]).toEqual({ actionType: Constants.api.user.LOGIN, queryParams: creds, response: successResponse});
////      });
//  });
});