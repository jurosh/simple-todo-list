import { createStore, combineReducers } from 'redux';

import contacts from './contacts';
import lists from './lists';

export const store = createStore(
  combineReducers({
    contacts,
    lists
  })
);
