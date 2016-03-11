
'use strict';

import React, {Component} from 'react';
import TitleService from '../../service/TitleService';
import EolaireService from '../../service/EolaireService';
import {Promise} from 'rsvp';
import ApiConsoleView from './ApiConsoleView.react';

//
// Service API model
//

const EOLAIRE_API_MODEL = [
  {
    name: "getEntityList",
    sampleRequest: {offsetToken: null, limit: 10},
    call: (request) => EolaireService.getEntityList(request.offsetToken, request.limit)
  },

  {
    name: "getItemById",
    sampleRequest: {id: 81},
    call: (request) => EolaireService.getItemById(request.id)
  },

  {
    name: "getItemProfile",
    sampleRequest: {id: 1005},
    call: (request) => EolaireService.getItemProfile(request.id)
  },

  {
    name: "getItemByType",
    sampleRequest: {itemTypeId: 7, offsetToken: null, limit: 10},
    call: (request) => EolaireService.getItemByType(request.itemTypeId, request.offsetToken, request.limit)
  },

  {
    name: "getItemRelations",
    sampleRequest: {itemId: 1005, filterMode: "ALL"},
    call: (request) => EolaireService.getItemRelations(request.itemId, request.filterMode)
  },


  /* Intentionally unsupported for demoing error response. */
  {
    name: "getUnsupportedItems",
    sampleRequest: {id: 1, acceptableTypes: []},
    call: () => new Promise((_, reject) => { reject({errorString: "Binding not implemented"}); })
  }
];

//
// DemoApiView
//

export default class EolaireApiConsoleView extends Component<{}, {}, {}> {

  componentDidMount(): void {
    TitleService.setTitle("Eolaire API");
  }

  render(): ?ReactElement {
    return <ApiConsoleView apiModel={EOLAIRE_API_MODEL} />;
  }
}
