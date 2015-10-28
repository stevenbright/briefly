
'use strict';

import Immutable from 'immutable';

const FooRecord = Immutable.Record({
  id: undefined,
  name: undefined,
  important: undefined
});

export default class Foo extends FooRecord {
  id: number;
  name: string;
  important: boolean;

  constructor(id: number, name: string) {
    super({id, name, important: false});
  }
}

