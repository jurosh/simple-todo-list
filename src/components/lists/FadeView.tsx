import React from 'react';
import { Animated, Text, View, Keyboard } from 'react-native';

export default class PopInputInView extends React.Component {
  state = {
    heightAnim: new Animated.Value(0),
    fadeAnim: new Animated.Value(0),
    keyboardHeight: new Animated.Value(0)
  };

  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    );
    Animated.parallel([
      Animated.timing(this.state.heightAnim, {
        toValue: 150,
        duration: 500
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000
      })
    ]).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      })
    ]).start();
  };

  keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: 0
      })
    ]).start();
  };

  render() {
    const { fadeAnim, heightAnim, keyboardHeight } = this.state;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: -5
          },
          shadowColor: '#000000',
          elevation: 4,
          bottom: keyboardHeight,
          backgroundColor: 'white',
          opacity: fadeAnim,
          height: heightAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
