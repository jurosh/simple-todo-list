import { YellowBox } from 'react-native';
import _ from 'lodash';

// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
// https://github.com/firebase/firebase-js-sdk/issues/97
export const fixFirebaseTimeoutWarning = () => {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
};
