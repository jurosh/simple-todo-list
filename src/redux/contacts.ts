import { combineReducers } from 'redux';

// Actions

export const startAddContacts = () => ({
  type: 'ADD_CONTACTS_START'
});

export const addContacts = (list, meta) => ({
  type: 'ADD_CONTACTS',
  list,
  meta
});

// Reducers

export const list = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CONTACTS_START':
      return [];
    case 'ADD_CONTACTS':
      return [...state, ...action.list];
    default:
      return state;
  }
};

export const meta = (
  state = {
    loading: false,
    total: null
  },
  action
) => {
  switch (action.type) {
    case 'ADD_CONTACTS_START':
      return {
        loading: true,
        total: null
      };
    case 'ADD_CONTACTS':
      return {
        loading: action.meta.hasNext,
        total: action.meta.total
      };
    default:
      return state;
  }
};

export default combineReducers({
  list,
  meta
});
