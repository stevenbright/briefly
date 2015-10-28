
'use strict';

import {Container} from 'flux/utils';
import React, {Component} from 'react';

import TodoStore from '../flux-infra/todo/TodoStore';

import MainSection from './MainSection.react';

type State = {
  todos: Immutable.Map<string, Todo>,
  areAllComplete: boolean,
  greeting: string
};


class SimpleApp extends Component<{}, {}, State> {
  static getStores(): Array<Store> {
    return [TodoStore];
  }

  static calculateState(prevState: ?State): State {
    return {
      greeting: 'Hello',
      todos: TodoStore.getState(),
      areAllComplete: TodoStore.areAllComplete()
    };
  }

  render(): ?ReactElement {
    return (
      <div>
        <p>Hello from demo <strong>react</strong> webapp!!</p>
        <MainSection todos={this.state.todos} areAllComplete={this.state.areAllComplete} />
        <hr/>
      </div>
    );
  }
}

const SimpleAppContainer = Container.create(SimpleApp);
export default SimpleAppContainer;
