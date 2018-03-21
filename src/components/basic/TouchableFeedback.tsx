import React from 'react';
import { Platform } from 'react-native';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProperties
} from 'react-native';

const TouchableFeedbackByPlatform = Platform.select({
  ios: TouchableHighlight as any,
  android: TouchableNativeFeedback
});

interface IProps extends TouchableNativeFeedbackProperties {
  backgroundRippleColor?: string;
}

const TouchableFeedback = (props: IProps) => (
  <TouchableFeedbackByPlatform
    {...props}
    {...(Platform.OS === 'android' && props.backgroundRippleColor
      ? {
          background: TouchableNativeFeedback.Ripple(props.backgroundRippleColor)
        }
      : {})}
  />
);

export default TouchableFeedback;
