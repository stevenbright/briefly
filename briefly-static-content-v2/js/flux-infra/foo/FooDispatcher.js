
'use strict';

import type {Action} from './FooActions';

import {Dispatcher} from 'flux';

const instance: Dispatcher<Action> = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './FooDispatcher';`
export const dispatch = instance.dispatch.bind(instance);

