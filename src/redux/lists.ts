import { combineReducers } from 'redux';

// Models

export interface ITodoList {
  id: string;
  name: string;
  todosCount: number;
}

// Actions

export const storeLists = (lists: ITodoList[]) => ({
  type: 'STORE_LISTS' as 'STORE_LISTS',
  lists
});

type Action = GetReturnedType<typeof storeLists>;

// Reducers

export const list = (state: ITodoList[] = [], action: Action) => {
  switch (action.type) {
    case 'STORE_LISTS':
      return action.lists;
    default:
      return state;
  }
};

export default combineReducers({
  list
} as any);
