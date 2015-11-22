
'use strict';

import React, {Component} from 'react';
import TitleService from '../../service/TitleService';
import CatalogAdapterService from '../../service/CatalogAdapterService';
import {Promise} from 'rsvp';
import ApiConsoleView from './ApiConsoleView.react';

//
// Service API model
//

const MODEL = [
  {
    name: "getAllEntityTypes",
    sampleRequest: {},
    call: (request) => CatalogAdapterService.getAllEntityTypes()
  }
];

//
// CatalogAdapterApiConsoleView
//

export default class CatalogAdapterApiConsoleView extends Component<{}, {}, {}> {

  componentDidMount(): void {
    TitleService.setTitle("Catalog Adapter API");
  }

  render(): ?ReactElement {
    return <ApiConsoleView apiModel={MODEL} />;
  }
}
