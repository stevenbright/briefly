
'use strict';

import React, {Component} from 'react';

import {Promise} from 'rsvp';

export default class ApiConsoleView extends Component<{},
  /* Props */{ apiModel: array },
  /* State */{ requestText: ?string }> {
  state = {
    pickedModel: null,
    isQueryRunning: false,
    requestText: null,
    responseLog: []
  }

  render(): ?ReactElement {
    const modelEntriesUi = this._renderModelEntries();
    const pickedApiUi = (this.state.pickedModel == null ? this._renderMissingSelection() : this._renderPickedApiSelection());
    const responseLogEntriesUi = this._renderResponseLogEntries();

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">{modelEntriesUi}</ul>
          </div>
          <div className="col-md-9">
            {pickedApiUi}
            <h3>Responses:</h3>
            <ul className="list-group">{responseLogEntriesUi}</ul>
          </div>
        </div>
      </div>
    );
  }

  _renderResponseLogEntries(): ?ReactElement {
    return this.state.responseLog.map((logEntry) => {
      const statusUi = logEntry.failed ? <span>FAILED</span> : <span>SUCCEEDED</span>;
      const headingClassName = logEntry.failed ? "bg-danger" : "bg-success";
      const startedStr = (new Date(logEntry.started)).toString();
      const timeDeltaStr = logEntry.timeDelta + " ms";

      return (
        <li key={logEntry.id} className="list-group-item">
          <small>{startedStr} - took {timeDeltaStr}</small>
          <br/>
          <p className={headingClassName}><span>{logEntry.apiName}</span> - {statusUi}</p>
          <h4>Request</h4>
          <p className="use-monospace">{logEntry.requestText}</p>
          <h4>Response</h4>
          <p className="use-monospace">{logEntry.responseText}</p>
        </li>
      );
    });
  }

  _renderModelEntries(): ?ReactElement {
    return this.props.apiModel.map((apiEntry) => {
      const apiEntryClickHandler = () => {
        this.setState({pickedModel: apiEntry, requestText: JSON.stringify(apiEntry.sampleRequest)});
      };
      return (
        <li key={apiEntry.name} className="list-group-item">
          <button className="btn btn-block" onClick={apiEntryClickHandler}>{apiEntry.name}</button>
        </li>
      );
    });
  }

  _renderMissingSelection(): ?ReactElement {
    return (<p>Nothing selected</p>);
  }

  _renderPickedApiSelection(): ?ReactElement {
    const pickedModel = this.state.pickedModel;
    const requestStr = JSON.stringify(pickedModel.sampleRequest);

    const runClickHandler = () => { this._handleRunButtonClick(pickedModel); };

    const hintText = (this.state.isQueryRunning ? "Executing query. Please, wait..." : "Click 'Run' when done.");
    const runButtonDisabled = this.state.isQueryRunning;

    return (
      <div>
        <h2>{pickedModel.name}</h2>
        <div>
          <textarea
            className="form-control use-monospace"
            ref="textarea"
            onChange={this._handleRequestChange}
            value={this.state.requestText} />
        </div>
        <p className="text-muted">{hintText}</p>
        <button className="btn btn-danger pull-right" type="button" onClick={this._handleClearRequestLogClick}>Clear Request Log</button>
        <button className="btn btn-primary" type="button" disabled={runButtonDisabled} onClick={runClickHandler}>Run</button>
        <hr/>
      </div>
    );
  }

  _handleRunButtonClick(pickedModel): void {
    this.setState({isQueryRunning: true});
    let jsObject = null;
    let responsePromise = null;

    const started = Date.now();

    try {
      jsObject = JSON.parse(this.state.requestText);
    } catch (e) {
      responsePromise = new Promise((_, reject) => {
        reject({
          errorString: "Syntax error while parsing input JSON: " + e.message
        });
      });
    }

    if (responsePromise == null) {
      responsePromise = pickedModel.call(jsObject);
    }

    responsePromise.then((data) => {
      //console.log("data", data);
      this._handleResponse(started, false, pickedModel.name, jsObject, JSON.stringify(data));
    }, (err) => {
      console.log("Error", err);
      this._handleResponse(started, true, pickedModel.name, jsObject, "Error: " + err.errorString);
    });
  }

  _handleResponse(started, failed, apiName, requestObject, responseText): void {
    const timeDelta = Date.now() - started;

    const logEntry = {
      id: apiName + "-" + this.state.responseLog.length,
      failed,
      apiName,
      requestText: JSON.stringify(requestObject),
      responseText,
      timeDelta,
      started
    };


    const newResponseLog = [logEntry].concat(this.state.responseLog);

    this.setState({isQueryRunning: false, responseLog: newResponseLog});
  }

  _handleRequestChange = (event) => {
    this.setState({requestText: event.target.value});
  }

  _handleClearRequestLogClick = () => {
    this.setState({responseLog: []});
  }
}
