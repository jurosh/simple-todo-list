import { getDb, getUserId } from './index';
import { uploadImageAsync } from './image';

export const queryTodos = listId =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .orderBy('createdAt');

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
      count: 0,
      createdAt: new Date()
    } as IList);

export const updateList = (listId, { name }) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .update({ name });

export interface IList {
  name: string;
  count: number;
}

export interface ITodo {
  text: string;
  image?: string;
  contact?: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    image?: string | null;
  };
  check?: boolean;
}

export const addTodo = (listId, todoObject: ITodo) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .add({
      ...todoObject,
      createdAt: new Date(),
      updatedAt: new Date()
    });

export const updateTodo = (listId: string, todoId: string, todo: ITodo) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .doc(todoId)
    .update({
      ...todo,
      updatedAt: new Date()
    });

export const removeTodo = (listId: string, id: string) =>
  getDb()
    .collection('users')
    .doc(getUserId())
    .collection('lists')
    .doc(listId)
    .collection('todos')
    .doc(id)
    .delete();

export const uploadTodoImage = async (listId, base64: string) => {
  const imageUrl = await uploadImageAsync(base64);
  return addTodo(listId, {
    text: 'Image',
    image: imageUrl
  });
};

export const addTodoContact = async (
  listId,
  contact: { id: string; name: string; phone: string; email: string; image: string }
) => {
  return addTodo(listId, {
    text: 'Contact',
    contact: {
      id: contact.id || '',
      name: contact.name || '',
      phone: contact.phone || '',
      email: contact.email || '',
      image: contact.image || null
    }
  });
};
