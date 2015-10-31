
'use strict';

import React, {Component} from 'react';

import Immutable from "immutable";
import type CatalogItem from '../../model/Item';

import PersonList from './PersonList.react';

type Props = {
  personList: ?Immutable.List<CatalogItem>,
  nameParts: ?Immutable.List<string>
};

type State = {};

export default class PersonHintsList extends Component<{}, Props, State> {
  render(): ?ReactElement {
    if (this.props.personList != null) {
      return (
        <div>
          <h2>Persons</h2>
          <PersonList persons={this.props.personList} />
        </div>
      );
    } else if (this.props.nameParts.size > 0) {
      const nameParts = this.props.nameParts.map(function (part) {
        var personUrl = "#/persons/prefix/" + encodeURIComponent(part);
        return (<span key={part} className="named-value-elem"><a href={personUrl}><strong>{part}</strong>&nbsp;<small>&hellip;</small></a></span>);
      });

      return (
        <div>
          <h2>Person Name Hints</h2>
          <p>{nameParts}</p>
        </div>
      );
    }

    return (<p>No person suggestions available.</p>);
  }
}
