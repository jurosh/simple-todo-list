import * as React from 'react';
import RNCheckBox from 'react-native-check-box';
import { StyleSheet } from 'react-native';

interface IProps {
  checked: boolean;
  leftText?: string;
  rightText?: string;
  onClick: () => void;
}

const Checkbox = ({ checked, onClick, leftText, rightText }: IProps) => (
  <RNCheckBox
    style={styles.check}
    onClick={onClick}
    isChecked={checked}
    leftText={leftText}
    rightText={rightText}
  />
);

const styles = StyleSheet.create({
  check: {
    flex: 1,
    padding: 10
  }
});

export default Checkbox;
