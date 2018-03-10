import firebase from 'react-native-firebase';
// import * as firebase from 'firebase';
// Required for side-effects
// import 'firebase/firestore';

// https://firebase.google.com/docs/firestore/quickstart

var config = {
  apiKey: 'AIzaSyDZD4rj27VoH0Sx5srZfGWVH2_T4PbU5D8',
  authDomain: 'toptalreactnativeacademy.firebaseapp.com',
  // databaseURL: 'https://toptalreactnativeacademy.firebaseio.com',
  projectId: 'toptalreactnativeacademy'
  // storageBucket: 'toptalreactnativeacademy.appspot.com',
  // messagingSenderId: '1081381779848'
};
// firebase.initializeApp(config);

// firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();

// Listen for authentication state to change.
// firebase.auth().onAuthStateChanged(user => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   }
//   // Do other things
// });

// db
//   .collection('lists')
//   .add({
//     name: 'NewName'
//   })
//   .then(function(docRef) {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch(function(error) {
//     console.error('Error adding document: ', error);
//   });

// firebase
//   .auth()
//   .signInAnonymouslyAndRetrieveData()
//   .then(credential => {
//     if (credential) {
//       console.log('default app user ->', credential.user.toJSON());
//     }
//   });

export default () => 0;
