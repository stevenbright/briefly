
'use strict';

import type {Action} from './FooActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Foo from './Foo';
import FooDispatcher from './FooDispatcher';

// Set up the store, If we didn't care about order we could just use MapStore
type State = Immutable.OrderedMap<string, Todo>;

class FooStore extends ReduceStore<string, Foo> {
  getInitialState(): State {
    return Immutable.OrderedMap();
  },

  reduce(state: State, action: Action): State {
    switch (action.type) {
      case 'foo/complete':
        return state.setIn([action.id, 'complete'], true);
      default:
        return state;
    }
  }
}

const instance = new FooStore();

export default instance;


