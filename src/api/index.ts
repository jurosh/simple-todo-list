import * as firebase from 'firebase';
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

let globalNewlyRegisteredMail = false;
let globalNewlyRegistered: { email: string; password: string } | null = null;
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
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      globalNewlyRegisteredMail = true;
      globalNewlyRegistered = { email, password };
    });

export const sendVerificationEmail = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return currentUser.sendEmailVerification().then(() => {
      console.log('Verification mail sent');
    });
  }
  return Promise.reject('User not logged');
};

// Firebase bug https://github.com/invertase/react-native-firebase/issues/20
export const refreshRegisteredUser = () =>
  logout().then(() => {
    if (globalNewlyRegistered) {
      return login(globalNewlyRegistered.email, globalNewlyRegistered.password).then(
        () => {
          // Forget cached credentials forever
          globalNewlyRegistered = null;
        }
      );
    }
    return Promise.reject('no registered user credentials');
  });

export const initializeAndWaitForAuth = (
  onLogin: (emailVerified: boolean) => void,
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
      const { emailVerified } = user;
      console.log('[Firebase] We are authenticated now!', emailVerified);
      globalCredential = user;
      onLogin(emailVerified);
      if (globalNewlyRegisteredMail) {
        sendVerificationEmail();
        globalNewlyRegisteredMail = false;
      }
    } else {
      console.log('We are not auth');
    }
    onReady();
  });
};

export const getDb = (): firebase.firestore.Firestore => globalFirestoreDb as any;
