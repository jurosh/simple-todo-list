import { YellowBox } from 'react-native';
import _ from 'lodash';

// There's currently an issue in react-native that prevents Firestore from workingproperly on Android.
// See https://github.com/firebase/firebase-js-sdk/issues/283 and https://github.com/facebook/react-native/pull/17449.
// As a workaround for now, you can probably add this code (before you initialize firebase) to work around the bug:
const fixFirebaseRequests = () => {
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body) {
    if (body === '') {
      originalSend.call(this);
    } else {
      originalSend.call(this, body);
    }
  };
};

// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
// https://github.com/firebase/firebase-js-sdk/issues/97
const fixFirebaseTimeoutWarning = () => {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const clonedConsole = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      clonedConsole.warn(message);
    }
  };
};

export const fixFirebase = () => {
  fixFirebaseTimeoutWarning();
  fixFirebaseRequests();
};
