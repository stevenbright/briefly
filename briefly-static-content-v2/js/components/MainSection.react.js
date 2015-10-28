'use strict';

import type Immutable from 'immutable';
import type Todo from '../flux-infra/todo/Todo';

import {dispatch} from '../flux-infra/todo/TodoDispatcher';
import React, {Component} from 'react';

type Props = {
  todos: Immutable.Map<string, Todo>,
  areAllComplete: boolean,
};

export default class MainSection extends Component<{}, Props, {}> {
  render(): ?ReactElement {
    const {todos, areAllComplete} = this.props;

    if (todos.size === 0) {
      return null;
    }

    const todoItems = [];
    for (let [id, todo] of todos) {
      var todoStr = JSON.stringify(todo);
      todoItems.push(<li key={id}>{todoStr}</li>);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todoItems}</ul>
      </section>
    );
  }

  _onToggleCompleteAll(): void {
    dispatch({type: 'todo/toggle-complete-all'});
  }
}
