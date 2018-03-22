import * as React from 'react';
import { connect } from 'react-redux';
import LoginScreen from './login/LoginScreen';
import NonVerifiedUser from './login/NonVerifiedUser';
import Router from './Router';
import { initializeAndWaitForAuth } from '../api';

class LoginOrContinue extends React.Component<{ onLogout }> {
  state = {
    initialized: false,
    logged: false,
    emailVerified: false
  };

  onLogin = emailVerified => {
    this.setState({ logged: true, emailVerified });
  };

  onLogout = () => {
    this.setState({ logged: false });
    this.props.onLogout();
  };

  onReady = () => {
    this.setState({ initialized: true });
  };

  componentDidMount() {
    initializeAndWaitForAuth(this.onLogin, this.onLogout, this.onReady);
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }
    if (!this.state.logged) {
      return <LoginScreen />;
    }
    if (!this.state.emailVerified) {
      return <NonVerifiedUser />;
    }
    return <Router />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch({ type: 'LOGOUT' });
  }
});

export default connect(undefined, mapDispatchToProps)(LoginOrContinue);
