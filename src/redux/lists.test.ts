import { list, ITodoList } from './lists';

it('reducer list', () => {
  const todoList: ITodoList = {
    id: 'id',
    name: 'Name',
    todosCount: 0
  };

  expect(
    list([todoList], {
      type: 'STORE_LISTS',
      lists: []
    })
  ).toEqual([]);

  expect(
    list([todoList], {
      type: 'STORE_LISTS',
      lists: [todoList, todoList]
    })
  ).toEqual([todoList, todoList]);
});
