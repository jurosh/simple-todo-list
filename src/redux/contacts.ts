import { combineReducers } from 'redux';

// Actions

// Reducers

export const list = (state, action) => {
  return [];
};

export const meta = (state, action) => {
  return {
    loading: false,
    total: 0,
    loaded: 0
  };
};

export default combineReducers({
  list,
  meta
});
