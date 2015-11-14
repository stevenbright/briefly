
'use strict';

import React, {Component} from 'react';
import TitleService from '../../service/TitleService';
import EolaireService from '../../service/EolaireService';
import {Promise} from 'rsvp';
import ApiConsoleView from '../admin/ApiConsoleView.react';

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
    sampleRequest: {id: 1},
    call: (request) => EolaireService.getItemById(request.id)
  },

  {
    name: "getItemProfile",
    sampleRequest: {id: 1},
    call: (request) => EolaireService.getItemProfile(request.id)
  },

  {
    name: "getItemByType",
    sampleRequest: {itemTypeId: 1, offsetToken: null, limit: 10},
    call: (request) => EolaireService.getItemProfile(request.itemTypeId, request.offsetToken, request.limit)
  },


  /* Intentionally unsupported for demoing how it can be do that. */
  {
    name: "getUnsupportedItems",
    sampleRequest: {id: 1, acceptableTypes: []},
    call: () => new Promise((_, reject) => { reject({errorString: "Binding not implemented"}); })
  }
];

//
// DemoApiView
//

export default class DemoApiView extends Component<{}, {}, {}> {

  componentDidMount(): void {
    TitleService.setTitle("Demo API View");
  }

  render(): ?ReactElement {
    return <ApiConsoleView apiModel={EOLAIRE_API_MODEL} />;
  }
}
