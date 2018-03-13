import * as React from 'react';
import AuthOrContinue from './components/AuthOrContinue';
import { fixFirebaseTimeoutWarning } from './utils/fixes';

fixFirebaseTimeoutWarning();

const Entry = () => <AuthOrContinue />;

export default Entry;
