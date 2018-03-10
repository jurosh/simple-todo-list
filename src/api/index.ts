import * as firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth';
import 'firebase/firestore'; // Required for side-effects

// https://firebase.google.com/docs/firestore/quickstart
var config = {
  apiKey: 'AIzaSyDZD4rj27VoH0Sx5srZfGWVH2_T4PbU5D8',
  authDomain: 'toptalreactnativeacademy.firebaseapp.com',
  databaseURL: 'https://toptalreactnativeacademy.firebaseio.com',
  projectId: 'toptalreactnativeacademy',
  storageBucket: 'toptalreactnativeacademy.appspot.com',
  messagingSenderId: '1081381779848'
};

let globalFirestoreDb: any | null = null;
let globalOnLogout = () => {};
let globalCredential: {
  apiKey: string;
  email: string;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
  stsTokenManager: {
    accessToken: string;
    apiKey: string;
    expirationTime: number;
    refreshToken: string;
  };
} | null = null;

export const getUserEmail = () => (globalCredential ? globalCredential.email : '');

export const getUserPhoto = () => (globalCredential ? globalCredential.photoURL : null);

export const login = (email: string, password: string): Promise<void> =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      if (credential) {
        globalCredential = credential;
      } else {
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

export const initializeAndWaitForAuth = (
  onLogin: () => void,
  onLogout: () => void
): void => {
  console.log('[Firebase] Starting firebase connection...');
  globalOnLogout = onLogout;
  firebase.initializeApp(config);

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      console.log('[Firebase] We are authenticated now!');
      onLogin();
    }
  });

  globalFirestoreDb = firebase.firestore();
};
