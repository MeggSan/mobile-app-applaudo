import React from 'react';
import {Pressable, Text} from 'react-native';
import {GlobalStyles} from 'utils/GlobalStyles';

// STYLES
import {Styles} from './ButtonStyles';

export const Button = ({text, onPress, colorButton = null}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        Styles.containerButton,
        colorButton ? colorButton : Styles.colorButton,
      ]}>
      <Text style={GlobalStyles.textBold}>{text}</Text>
    </Pressable>
  );
};
