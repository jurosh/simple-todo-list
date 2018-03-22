import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

// https://firebase.google.com/docs/functions/typescript

exports.sendVerifyEmail = functions.auth.user().onCreate(event => {
  if (event.data.emailVerified) {
    // Send verification email, probably not possibly on backend
  }
});

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

/**
 *  Aggregate `todos` count and put number into `lists` object
 */
const updateCount = (
  event: functions.Event<functions.firestore.DeltaDocumentSnapshot>
) => {
  const { userId, listId } = event.params;
  return firestore.runTransaction(transaction => {
    const todosRef = firestore
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId)
      .collection('todos');

    const listRef = firestore
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId);

    return transaction.get(todosRef).then(doc => {
      transaction.update(listRef, { count: doc.docs.length });
    });
  });
};

export const countNewTodos = functions.firestore
  .document('users/{userId}/lists/{listId}/todos/{todoId}')
  .onCreate(updateCount);

export const decreaseCountByRemovedTodos = functions.firestore
  .document('users/{userId}/lists/{listId}/todos/{todoId}')
  .onDelete(updateCount);
