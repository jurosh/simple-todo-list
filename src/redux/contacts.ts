import { combineReducers } from 'redux';

// Models

export interface IContact {
  name: string;
  id: string;
  firstName: string;
}

// Actions

export const startAddContacts = () => ({
  type: 'ADD_CONTACTS_START' as 'ADD_CONTACTS_START'
});

export const addContacts = (
  list: IContact[],
  meta: { hasNext: boolean; total: number }
) => ({
  type: 'ADD_CONTACTS' as 'ADD_CONTACTS',
  list,
  meta
});

type Action = GetReturnedType<typeof startAddContacts | typeof addContacts>;

// Reducers

export const list = (state: IContact[] = [], action: Action) => {
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
