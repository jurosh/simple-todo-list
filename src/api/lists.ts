import * as firebase from 'firebase';
import { getDb, getUserId } from './index';
import { uploadImageAsync } from './image';

export const queryList = listId =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId);

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
      todos: [
        {
          text: 'Todo1'
        },
        {
          text: 'Todo2'
        }
      ]
    });

export const addTodo = (listId, todoObject: { text: string; image?: string }) =>
  getDb()
    .runTransaction(transaction => {
      const listRef = getDb()
        .collection('users')
        .doc(getUserId())
        .collection('lists')
        .doc(listId);

      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(listRef).then(doc => {
        if (!doc || !doc.exists) {
          throw 'Document does not exist!';
        }

        var todos: any[] = (doc as any).data().todos;
        todos.push(todoObject);
        transaction.update(listRef, {
          todos
        });
      });
    })
    .then(() => console.log('Transaction successfully committed!'))
    .catch(error => console.warn('Transaction failed', error));

export const uploadTodoImage = async (listId, base64: string) => {
  const imageUrl = await uploadImageAsync(base64);
  return addTodo(listId, {
    text: 'Image',
    image: imageUrl
  });
};
