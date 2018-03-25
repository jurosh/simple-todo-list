import * as React from 'react';
import AuthOrContinue from './components/AuthOrContinue';
import { fixFirebase } from './utils/fixes';
import { Provider } from 'react-redux';
import { store } from './redux';

fixFirebase();

const Entry = () => (
  <Provider store={store}>
    <AuthOrContinue />
  </Provider>
);

export default Entry;
