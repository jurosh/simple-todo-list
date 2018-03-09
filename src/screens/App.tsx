import * as React from 'react';
// import styles from 'AppStyle.js';

export default class App extends React.Component {
  state = {
    screen: 1
  };

  setScreen = screen => () => this.setState({ screen });

  renderComponent() {}

  render() {
    return null;
  }
}
