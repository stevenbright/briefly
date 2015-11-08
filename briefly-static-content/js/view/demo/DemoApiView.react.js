
'use strict';

import React, {Component} from 'react';
import TitleService from '../../service/TitleService';
import EolaireService from '../../service/EolaireService';

export default class DemoApiView extends Component<{}, {}, {}> {

  componentDidMount(): void {
    TitleService.setTitle("Demo API View");

    const p = EolaireService.getEntityList(null, 10);
    p.then(function (data) {
      console.log("getEntityList response", JSON.stringify(data));
    })
  }

  render(): ?ReactElement {
    return (
      <div className="container">
        <p>Demo API View</p>
      </div>
    );
  }
}
