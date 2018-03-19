import { list, meta, Action } from './contacts';

const addActionStart: Action = {
  type: 'ADD_CONTACTS_START'
};

const addAction: Action = {
  type: 'ADD_CONTACTS',
  list: ['contact' as any],
  meta: {
    hasNext: true,
    total: 123
  }
};

const addActionFinal = {
  ...addAction,
  meta: {
    hasNext: false,
    total: 234
  }
};

it('reducer contacts - list', () => {
  expect(list([{} as any], addActionStart)).toEqual([]);
  expect(list([], addActionFinal)).toEqual(['contact']);
});

it('reducer contacts - meta ', () => {
  const metaDefaultState = {
    loading: false,
    total: null
  };

  expect(meta(metaDefaultState, addActionStart)).toEqual({
    loading: true,
    total: null
  });

  expect(meta(metaDefaultState, addAction)).toEqual({
    loading: true,
    total: 123
  });

  expect(meta(metaDefaultState, addActionFinal)).toEqual({
    loading: false,
    total: 234
  });
});
