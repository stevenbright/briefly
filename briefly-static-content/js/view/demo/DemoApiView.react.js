
'use strict';

import React, {Component} from 'react';
import TitleService from '../../service/TitleService';
import EolaireService from '../../service/EolaireService';


//
// ApiInvocationRow
//

class ApiInvocationRow extends Component<{},
  /* Props */{ request: string, lastResponse: string, _onRun: (requestValue: object) => void },
  /* State */{ requestText: string }> {
  state = {
    requestText: this.props.request
  }

  render(): ?ReactElement {
    return (
      <tr>
        <td>
          <input className="input-xlarge" value={this.state.requestText} onChange={this._requestValueChanged} />
        </td>
        <td><button type="button" className="btn btn-default" onClick={this._onExecuteClick}>Execute</button></td>
        <td>{this.props.lastResponse}</td>
      </tr>
    );
  }

  _requestValueChanged = (event) => {
    this.setState({requestText: event.target.value});
  }

  _onExecuteClick = () => {
    const requestJson = JSON.parse(this.state.requestValue);
    this._onRun(requestJson);
  }
}

//
// DemoApiView
//

function createApiInput(obj) {
  return {
    request: JSON.stringify(obj),
    lastResponse: "<NOT STARTED>",
  }
}

type State = {
  getEntityList: object
};

export default class DemoApiView extends Component<{}, {}, State> {
  state = {
    getEntityList: createApiInput(),
    getEntityListResponseResult: "<PENDING>"
  }

  componentDidMount(): void {
    TitleService.setTitle("Demo API View");

    const p = EolaireService.getEntityList(null, 10);
    p.then(function (data) {
      console.log("getEntityList response", data);
      this.setState({getEntityListResponseResult: JSON.stringify(data)});
    }.bind(this), function (err) {
      this.setState({getEntityListResponseResult: "<ERROR>"});
    });
  }

  render(): ?ReactElement {
    const getEntityListRequestStr = JSON.stringify(this.state.getEntityListRequest);

    const getEntityListResponseResult = this.state.getEntityListResponseResult;

    return (
      <div className="container">
        <p>Demo API View</p>
        <hr/>
        <h2>GetEntityList</h2>
        <p>${getEntityListResponseResult}</p>
        <hr/>
        <table className="table account-list-table">
          <thead>
            <th>Request</th>
            <th/>
            <th>Response</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="input-xlarge" value={getEntityListRequestStr} onChange={this._getEntityListRequestChanged} />
              </td>
              <td><button type="button" className="btn btn-default">Execute</button></td>
              <td>{this.state.getEntityListResponse}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  _getEntityListRequestChanged = (event) => {
    try {
      const parsedValue = JSON.parse(event.target.value);
      this.setState({getEntityListRequest: parsedValue});
    } catch (e) {
      console.debug("Malformed JSON in input, ignoring")
    }
  }
}
