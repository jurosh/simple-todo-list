# Todos (RN Toptal Academy App)

Final app https://expo.io/@jurosh/simple-todo-list

App primary developed for Android. IOS version isn't optimized but should be functional.

## Instructions

Install npm dependencies

```
npm install
```

Start local packager (Update REACT_NATIVE_PACKAGER_HOSTNAME address if required, in package.json)

```
npm start
```

Open expo client on device and scan QR code. To start in emulator hit key `a`.

### Publish

```
npm install -g exp
exp publish
```

## Tech Links

App bootstraped using https://github.com/mathieudutour/create-react-native-app-typescript

Compatibility: https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md

Contacts: https://docs.expo.io/versions/latest/sdk/contacts.html

Sharing: https://facebook.github.io/react-native/docs/share.html

Camera: https://docs.expo.io/versions/latest/sdk/imagepicker.html

Uploading image: https://forums.expo.io/t/expo-and-uploading-image-blobs/227/20

CheckBox: https://github.com/crazycodeboy/react-native-check-box

Keyboard Avoid View: https://facebook.github.io/react-native/docs/keyboardavoidingview.html

Icons: https://expo.github.io/vector-icons/

Colors: https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FFEE58&secondary.color=6A1B9A

Transitions: https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053

Animations: https://facebook.github.io/react-native/docs/animations.html

## Firebase Rest API

Firestore Project: https://console.firebase.google.com/u/0/project/toptalreactnativeacademy/database/firestore/

Authentication Docs

* https://firebase.google.com/docs/reference/rest/auth/
* https://firebase.google.com/docs/database/rest/auth

## Requirements

Thank you for signing up for the final project of the React Native Academy.

For reference, all course materials are available here:
https://docs.google.com/document/d/1vAttwTatHsu5pCkzBp5U4XkwGMtstKzzEU8WJADaGZE/edit?usp=sharing

The testing period is Friday 9th March to Friday 30th March.

Here is the project description.

**Write a mobile ToDo list application**

* User must be able to create an account and log in.
* User should be able to CRUD ToDo lists.
* The list should have a title, unlimited number of entries, and allow attachments, like images and people.
* User can filter saved lists by their name.
* Images can be attached either by accessing user photo library or by taking photos using a camera.
* People can be attached accessing the Contacts list.
* Lists should be shareable thought the Share interface.
* REST API. Make it possible to perform all user actions via the API, including authentication. If you do not know how to create your own backend you can use Firebase.com or similar services to create the API.
* Minimal UI/UX design is needed. You will not be marked by graphic design. However, do try to keep it as tidy as possible.
