import * as React from 'react';
import RNCheckBox from 'react-native-check-box';

interface IProps {
  checked: boolean;
  leftText?: string;
  rightText?: string;
  onClick: () => void;
}

const Checkbox = ({ checked, onClick, leftText, rightText }: IProps) => (
  <RNCheckBox
    style={{ flex: 1, padding: 10 }}
    onClick={onClick}
    isChecked={checked}
    leftText={leftText}
    rightText={rightText}
  />
);

export default Checkbox;
