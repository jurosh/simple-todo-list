import { createStore, combineReducers } from 'redux';
import contacts from './contacts';

export const store = createStore(
  combineReducers({
    contacts
  })
);
