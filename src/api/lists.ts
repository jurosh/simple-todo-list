import * as firebase from 'firebase';
import { getDb, getUserId } from './index';
import { uploadImageAsync } from './image';

export const queryTodos = listId =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos');

export const queryLists = () =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists');

export const removeList = id =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(id)
    .delete();

export const createList = (name: string) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .add({
      name,
      count: 0
    } as IList);

export const removeTodo = (listId: string, id: string) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .doc(id)
    .delete();

export interface IList {
  name: string;
  count: number;
}

export interface ITodo {
  text: string;
  image?: string;
  check?: boolean;
}

export const addTodo = (listId, todoObject: ITodo) =>
  getDb().runTransaction(transaction => {
    const todosRef = getDb()
      .collection('users')
      .doc(getUserId())
      .collection('lists')
      .doc(listId)
      .collection('todos')
      .add(todoObject);

    const listRef = getDb()
      .collection('users')
      .doc(getUserId())
      .collection('lists')
      .doc(listId);

    return transaction.get(listRef).then(doc => {
      transaction.update(listRef, {
        count: ((doc.data() as IList).count || 0) + 1
      });
    });
  });

export const updateTodo = (listId: string, todoId: string, todo: ITodo) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .doc(todoId)
    .update(todo);
// Restrict to only fields
// .set({
//   check: todo.check,
//   image: todo.image,
//   text: todo.text
// });

// .runTransaction(transaction => {
// This code may get re-run multiple times if there are conflicts.
// return transaction.get(listRef).then(doc => {
//   if (!doc || !doc.exists) {
//     throw 'Document does not exist!';
//   }

//   var todos: any[] = (doc as any).data().todos;
//   todos.push(todoObject);
//   transaction.update(listRef, {
//     todos
//   });
// });
// })
// .then(() => console.log('Transaction successfully committed!'))
// .catch(error => console.warn('Transaction failed', error));

export const uploadTodoImage = async (listId, base64: string) => {
  const imageUrl = await uploadImageAsync(base64);
  return addTodo(listId, {
    text: 'Image',
    image: imageUrl
  });
};
