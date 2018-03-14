import * as React from 'react';
import AuthOrContinue from './components/AuthOrContinue';
import { fixFirebaseTimeoutWarning } from './utils/fixes';
import { Provider } from 'react-redux';
import { store } from './redux';

fixFirebaseTimeoutWarning();

const Entry = () => (
  <Provider store={store}>
    <AuthOrContinue />
  </Provider>
);

export default Entry;
