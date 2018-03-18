import * as firebase from 'firebase';
// TODO: ? treba import FireAuth from 'react-native-firebase-auth';
import 'firebase/firestore'; // Required for side-effects

// https://firebase.google.com/docs/firestore/quickstart
const config = {
  apiKey: 'AIzaSyDZD4rj27VoH0Sx5srZfGWVH2_T4PbU5D8',
  authDomain: 'toptalreactnativeacademy.firebaseapp.com',
  // databaseURL: 'https://toptalreactnativeacademy.firebaseio.com',
  projectId: 'toptalreactnativeacademy',
  storageBucket: 'toptalreactnativeacademy.appspot.com'
  // messagingSenderId: '1081381779848'
};

let globalFirestoreDb: firebase.firestore.Firestore | null = null;
let globalOnLogout = () => console.error('[Api] logout, but missing callback');
let globalCredential: firebase.UserInfo | null = null;

export const getUserEmail = () => (globalCredential ? globalCredential.email : '');

export const getUserId = () => {
  if (globalCredential) {
    return globalCredential.uid;
  }
  throw new Error('Missing user uuid');
};

export const getUserPhoto = () => (globalCredential ? globalCredential.photoURL : null);

export const login = (email: string, password: string): Promise<void> =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      if (!credential) {
        console.warn('[Firebase] Issue with credentials');
      }
    });

export const logout = (): Promise<void> =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('[Firebase] Logged out');
      // Run callback to notify components
      globalOnLogout();
    });

export const register = (email: string, password: string): Promise<void> =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

// There's currently an issue in react-native that prevents Firestore from workingproperly on Android.
// See https://github.com/firebase/firebase-js-sdk/issues/283 and https://github.com/facebook/react-native/pull/17449.
// As a workaround for now, you can probably add this code (before you initialize firebase) to work around the bug:
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  if (body === '') {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};

export const initializeAndWaitForAuth = (
  onLogin: () => void,
  onLogout: () => void,
  onReady: () => void
): void => {
  console.log('[Firebase] Starting firebase connection...');

  firebase.initializeApp(config);

  globalOnLogout = onLogout;
  globalFirestoreDb = firebase.firestore();

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      console.log('[Firebase] We are authenticated now!');
      globalCredential = user;
      onLogin();
    } else {
      console.log('We are not auth');
    }
    onReady();
  });
};

export const getDb = (): firebase.firestore.Firestore => globalFirestoreDb as any;
