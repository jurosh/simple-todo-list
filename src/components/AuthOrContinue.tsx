import * as React from 'react';
import { connect } from 'react-redux';
import LoginScreen from './login/LoginScreen';
import Router from './Router';
import { initializeAndWaitForAuth } from '../api';

class LoginOrContinue extends React.Component<{ onLogout }> {
  state = {
    initialized: false,
    logged: false
  };

  onLogin = () => {
    this.setState({ logged: true });
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
    return this.state.logged ? <Router /> : <LoginScreen />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch({ type: 'LOGOUT' });
  }
});

export default connect(undefined, mapDispatchToProps)(LoginOrContinue);
