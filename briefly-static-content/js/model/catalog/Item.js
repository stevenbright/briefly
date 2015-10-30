'use strict';

import Immutable from "immutable";

const ItemRecord = Immutable.Record({
  id: undefined,
  name: undefined,
  type: undefined,
});

export default class Item extends ItemRecord {
  id: number;
  name: string;
  type: string;

  constructor(obj) {
    super(obj);
  }
}
