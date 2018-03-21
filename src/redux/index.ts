import { createStore, combineReducers } from 'redux';

import contacts from './contacts';
import lists from './lists';

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combineReducers({
    contacts,
    lists
  })(state, action);
};

export const store = createStore(rootReducer);
